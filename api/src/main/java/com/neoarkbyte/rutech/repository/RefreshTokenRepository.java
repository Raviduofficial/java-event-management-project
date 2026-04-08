package com.neoarkbyte.rutech.repository;

import com.neoarkbyte.rutech.entity.RefreshToken;
import com.neoarkbyte.rutech.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer> {
    RefreshToken findByToken(String token);
    boolean existsByToken (String token);
    void deleteByUser(User user);
}
