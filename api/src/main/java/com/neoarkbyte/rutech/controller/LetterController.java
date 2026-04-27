package com.neoarkbyte.rutech.controller;

import com.neoarkbyte.rutech.dto.ApiResponse;
import com.neoarkbyte.rutech.dto.ResponseUtil;
import com.neoarkbyte.rutech.dto.event.RejectRequestDTO;
import com.neoarkbyte.rutech.dto.letter.LetterCreateDTO;
import com.neoarkbyte.rutech.dto.letter.LetterResponseDTO;
import com.neoarkbyte.rutech.service.impl.LetterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/letters")
@RequiredArgsConstructor
public class LetterController {

    private final LetterService letterService;

    @PostMapping
    public ResponseEntity<ApiResponse<LetterResponseDTO>> createLetter(@Valid @RequestBody LetterCreateDTO createDTO) {
        LetterResponseDTO response = letterService.createLetter(createDTO);
        return ResponseEntity.ok(ResponseUtil.success("Letter created successfully", response, null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<LetterResponseDTO>> getLetterById(@PathVariable String id) {
        LetterResponseDTO response = letterService.getLetterById(id);
        return ResponseEntity.ok(ResponseUtil.success("Letter retrieved successfully", response, null));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<LetterResponseDTO>>> getAllLetters() {
        List<LetterResponseDTO> response = letterService.getAllLetters();
        return ResponseEntity.ok(ResponseUtil.success("Letters retrieved successfully", response, null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<LetterResponseDTO>> updateLetter(@PathVariable String id, @Valid @RequestBody LetterCreateDTO updateDTO) {
        LetterResponseDTO response = letterService.updateLetter(id, updateDTO);
        return ResponseEntity.ok(ResponseUtil.success("Letter updated successfully", response, null));
    }

    @PatchMapping("/{id}/approved")
    public ResponseEntity<ApiResponse<LetterResponseDTO>> approveLetter(@PathVariable String id) {
        LetterResponseDTO response = letterService.approveLetter(id);
        return ResponseEntity.ok(ResponseUtil.success("Letter approved successfully", response, null));
    }

    @PatchMapping("/{id}/rejected")
    public ResponseEntity<ApiResponse<LetterResponseDTO>> rejectLetter(@PathVariable String id, @RequestBody RejectRequestDTO rejectDTO) {
        LetterResponseDTO response = letterService.rejectLetter(id, rejectDTO.getMessage());
        return ResponseEntity.ok(ResponseUtil.success("Letter rejected  successfully", response, null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteLetter(@PathVariable String id) {
        letterService.deleteLetter(id);
        return ResponseEntity.ok(ResponseUtil.success("Letter deleted successfully", null, null));
    }
}
