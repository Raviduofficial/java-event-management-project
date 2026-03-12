package com.neoarkbyte.rutech.repository;

import com.neoarkbyte.rutech.entity.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.neoarkbyte.rutech.entity.Event;

@Repository
public interface VenueRepository extends JpaRepository<Venue, String> {
}
