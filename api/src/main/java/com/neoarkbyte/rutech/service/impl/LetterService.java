package com.neoarkbyte.rutech.service.impl;

import com.neoarkbyte.rutech.dto.letter.LetterCreateDTO;
import com.neoarkbyte.rutech.dto.letter.LetterResponseDTO;
import com.neoarkbyte.rutech.entity.Event;
import com.neoarkbyte.rutech.entity.PermissionLetter;
import com.neoarkbyte.rutech.mapper.LetterMapper;
import com.neoarkbyte.rutech.repository.EventRepository;
import com.neoarkbyte.rutech.repository.LetterRepository;
import com.neoarkbyte.rutech.type.STATUS;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LetterService {

    private final LetterRepository letterRepository;
    private final EventRepository eventRepository;
    private final LetterMapper letterMapper;

    @Transactional
    public LetterResponseDTO createLetter(LetterCreateDTO createDTO) {
        PermissionLetter letter = letterMapper.toEntity(createDTO);

        if (createDTO.getEventId() != null) {
            Event event = eventRepository.findById(createDTO.getEventId())
                    .orElseThrow(() -> new RuntimeException("Event not found: " + createDTO.getEventId()));
            letter.setEvent(event);
        }

        PermissionLetter savedLetter = letterRepository.save(letter);

        return letterMapper.toResponseDTO(savedLetter);
    }

    public LetterResponseDTO getLetterById(String id) {
        return letterRepository.findById(id)
                .map(letterMapper::toResponseDTO)
                .orElseThrow(() -> new RuntimeException("Permission list not found with id: " + id));
    }

    public List<LetterResponseDTO> getAllLetters() {
        return letterMapper.toResponseDTOs(letterRepository.findAll());
    }

    @Transactional
    public LetterResponseDTO updateLetter(String id, LetterCreateDTO updateDTO) {
        PermissionLetter existingLetter = letterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Permission letter not found with id: " + id));

        letterMapper.updateEntityFromDto(updateDTO, existingLetter);

        return letterMapper.toResponseDTO(existingLetter);
    }

    @Transactional
    public LetterResponseDTO approveLetter(String id) {
        PermissionLetter existingLetter = letterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Permission letter not found with id: " + id));

        existingLetter.setStatus(STATUS.APPROVED);

        return letterMapper.toResponseDTO(existingLetter);
    }

    @Transactional
    public LetterResponseDTO rejectLetter(String id, String message) {
        PermissionLetter existingLetter = letterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Permission letter not found with id: " + id));

        existingLetter.setStatus(STATUS.REJECTED);
        existingLetter.setRejectMessage(message);

        return letterMapper.toResponseDTO(existingLetter);
    }

    public void deleteLetter(String id) {
        if (!letterRepository.existsById(id)) {
            throw new RuntimeException("Permission letter not found with id: " + id);
        }
        letterRepository.deleteById(id);
    }
}
