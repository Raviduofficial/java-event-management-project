package com.neoarkbyte.rutech.service.impl;

import com.neoarkbyte.rutech.dto.TokenPair;
import com.neoarkbyte.rutech.entity.RefreshToken;
import com.neoarkbyte.rutech.entity.User;
import com.neoarkbyte.rutech.entity.UserPrincipal;
import com.neoarkbyte.rutech.repository.RefreshTokenRepository;
import com.neoarkbyte.rutech.type.TokenType;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cglib.core.internal.Function;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration}")
    private long jwtExpirationMs;

    @Value("${app.jwt.refresh-expiration}")
    private long refreshExpirationMs;


    public TokenPair generateTokenPair(Authentication authentication) {
        String accessToken = generateAccessToken(authentication);
        String refreshToken = generateRefreshToken(authentication);

        return new TokenPair(accessToken, refreshToken);
    }

    // Generate the access token
    public String generateAccessToken(Authentication authentication) {
        Map<String, String> claims = new HashMap<>();
        claims.put("tokenType", TokenType.ACCESS.name());

        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();
        String role = userPrincipal.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .get();

        claims.put("role", role);

        return generateToken(authentication, jwtExpirationMs, claims);
    }

    // Generate refresh token
    public String generateRefreshToken(Authentication authentication) {
        Map<String, String> claims = new HashMap<>();
        claims.put("tokenType", TokenType.REFRESH.name());

        String token = generateToken(authentication, refreshExpirationMs, claims);
        addRefreshTokenToDatabase(token, authentication);

        return token;
    }

    public void addRefreshTokenToDatabase(String token, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User user = userPrincipal.getUser();

        RefreshToken refreshToken = RefreshToken.builder()
                .token(token)
                .user(user)
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plusMillis(refreshExpirationMs))
                .revoked(false)
                .revokedAt(null)
                .build();

        refreshTokenRepository.save(refreshToken);
    }

    public boolean revokeRefreshToken(String token) {

        RefreshToken refreshToken = refreshTokenRepository.findByToken(token);

        if (refreshToken == null || refreshToken.isRevoked()) {
           return false;
        }

        refreshToken.setRevoked(true);
        refreshToken.setRevokedAt(Instant.now());

        refreshTokenRepository.save(refreshToken);
        return true;
    }

    @Transactional
    public void revokeAllRefreshTokensByUserId(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User user = userPrincipal.getUser();
        refreshTokenRepository.deleteByUser(user);
    }

    private String generateToken(Authentication authentication, long expirationInMs, Map<String, String> claims) {
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();

        Date now = new Date(); // Time of token creation
        Date expiryDate = new Date(now.getTime() + expirationInMs); // Time of token expiration

        return Jwts.builder()
                .header()
                .add("typ", "JWT")
                .and()
                .subject(userPrincipal.getUsername())
                .claims(claims)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSignInKey())
                .compact();
    }

    // Validate token
    public boolean validateTokenForUser(String token, UserDetails userDetails) {
        final String username = extractUsernameFromToken(token);
        return username != null && username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    public boolean isValidToken(String token) {
        return extractAllClaims(token) != null;
    }

    public String extractUsernameFromToken(String token) {
        Claims claims = extractAllClaims(token);

        if(claims != null) {
            return claims.getSubject();
        }
        return null;
    }

    // Validate if the token is refresh token
    public boolean isRefreshToken(String token) {
        Claims claims = extractAllClaims(token);
        if(claims == null) {
            return false;
        }
        return TokenType.REFRESH.name().equals(claims.get("tokenType"));
    }

    public boolean isAccessToken(String token) {
        Claims claims = extractAllClaims(token);
        if(claims == null) {
            return false;
        }
        return TokenType.ACCESS.name().equals(claims.get("tokenType"));
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    public String extractRoleFromToken(String token) {
        Claims claims = extractAllClaims(token);

        if(claims != null) {
            return claims.get("role", String.class);
        }

        return null;
    }

    private Claims extractAllClaims(String token) {
        Claims claims = null;

        try {
            claims = Jwts.parser()
                    .verifyWith(getSignInKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (JwtException | IllegalArgumentException e) {
            throw new RuntimeException(e);
        }

        return claims;
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}