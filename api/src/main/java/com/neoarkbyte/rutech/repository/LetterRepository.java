package com.neoarkbyte.rutech.repository;

import com.neoarkbyte.rutech.entity.PermissionLetter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LetterRepository extends JpaRepository<PermissionLetter, String> {
    List<PermissionLetter> findLettersByEventEventId(String eventId);
}
