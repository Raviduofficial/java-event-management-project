package com.neoarkbyte.rutech.repository;

import com.neoarkbyte.rutech.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUserName(String username);
    boolean existsByUserName(String username);
}
