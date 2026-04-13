package com.neoarkbyte.rutech.controller;

import com.neoarkbyte.rutech.dto.ApiResponse;
import com.neoarkbyte.rutech.dto.ResponseUtil;
import com.neoarkbyte.rutech.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartException;
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

    @ExceptionHandler(MultipartException.class)
    public ResponseEntity<ApiResponse<String>> handleMultipartException(MultipartException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ResponseUtil.error("Request must be multipart/form-data with a file field named 'file'", null));
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
        } catch (IOException ignored) {
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
    public List<String> listFiles() {
        return fileService.listFiles();
    }


    @DeleteMapping("/{filename}")
    public String delete(@PathVariable String filename) {
        return fileService.deleteFile(filename) ? "Deleted" : "Not Found";
    }
}
