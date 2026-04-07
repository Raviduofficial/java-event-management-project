package com.neoarkbyte.rutech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.neoarkbyte.rutech.entity.PermissionLetter;

@Repository
public interface LetterRepository extends JpaRepository<PermissionLetter, String> {
}
