package com.neoarkbyte.rutech.entity;

import com.neoarkbyte.rutech.util.Utils;
import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "refresh_tokens")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RefreshToken {

    @Id
    private String tokenId;

    @Column(nullable = false, unique = true)
    private String token;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @Column(nullable = false)
    private Instant issuedAt;

    @Column(nullable = false)
    private Instant expiresAt;

    private Instant revokedAt;

    @Column(nullable = false)
    private boolean revoked = false;

    @PrePersist
    public void generateId() {
        if (tokenId == null) {
            tokenId = Utils.generateId("RT", 8);
        }
    }
}