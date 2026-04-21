package com.neoarkbyte.rutech.controller;

import com.neoarkbyte.rutech.dto.ApiResponse;
import com.neoarkbyte.rutech.dto.ResponseUtil;
import com.neoarkbyte.rutech.service.FileService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<String>> upload(@RequestParam("file") MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ResponseUtil.error("Request must contain a non-empty 'file' field", null));
        }

        String filename = fileService.uploadFile(file);
        return ResponseEntity.ok(ResponseUtil.success("File uploaded successfully", filename, null));
    }

    @GetMapping("/download/{filename:.+}")
    public ResponseEntity<Resource> download(@PathVariable String filename) {
        Resource file = fileService.downloadFile(filename);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .body(file);
    }

    @GetMapping("/cdn/{filename:.+}")
    public ResponseEntity<Resource> serveAsCdn(@PathVariable String filename, HttpServletRequest request) {
        Resource file = fileService.downloadFile(filename);
        String contentType = null;

        try {
            contentType = request.getServletContext().getMimeType(file.getFile().getAbsolutePath());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        if (contentType == null) {
            contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CACHE_CONTROL, "public, max-age=31536000, immutable")
                .body(file);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<String>>> listFiles() {
        return ResponseEntity.ok(ResponseUtil.success("Files listed successfully", fileService.listFiles(), null));
    }


    @DeleteMapping("/{filename}")
    public ResponseEntity<ApiResponse<String>> delete(@PathVariable String filename) {
        boolean deleted = fileService.deleteFile(filename);
        if (deleted) {
            return ResponseEntity.ok(ResponseUtil.success("File deleted successfully", "Deleted", null));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ResponseUtil.error("File not found", "Not Found"));
        }
    }
}
