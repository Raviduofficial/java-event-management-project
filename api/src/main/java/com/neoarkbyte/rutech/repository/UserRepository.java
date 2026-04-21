package com.neoarkbyte.rutech.repository;

import com.neoarkbyte.rutech.entity.User;
import com.neoarkbyte.rutech.type.ROLE;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findByUserName(String username);
    boolean existsByUserName(String username);
    <T extends User> List<T> findByRole(ROLE role);
    <T extends User> T findByUserId(String userId);
}
