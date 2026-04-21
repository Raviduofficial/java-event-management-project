package com.neoarkbyte.rutech.service.impl;


import com.neoarkbyte.rutech.service.FileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.security.MessageDigest;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocalFileService implements FileService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public String uploadFile(MultipartFile file) {
        try {
            Path path = Paths.get(uploadDir);

            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }

            String originalName = file.getOriginalFilename();

            String extension = "";
            if (originalName != null && originalName.contains(".")) {
                extension = originalName.substring(originalName.lastIndexOf("."));
            }
            // hashing the original contents of the file and generating filename
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(file.getBytes());

            String hash = Base64.getUrlEncoder().withoutPadding().encodeToString(hashBytes);
            String newFileName = hash + extension;

            Path filePath = path.resolve(newFileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            return newFileName;

        } catch (Exception e) {
            throw new RuntimeException("File upload failed");
        }
    }
    @Override
    public Resource downloadFile(String filename) {
        try {
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            Path filePath = uploadPath.resolve(filename).normalize();

            if (!filePath.startsWith(uploadPath) || !Files.exists(filePath) || !Files.isReadable(filePath)) {
                throw new RuntimeException("File not found");
            }

            return new UrlResource(filePath.toUri());
        } catch (Exception e) {
            throw new RuntimeException("File not found");
        }
    }

    @Override
    public List<String> listFiles() {
        try {
            return Files.list(Paths.get(uploadDir))
                    .map(path -> path.getFileName().toString())
                    .collect(Collectors.toList());
        } catch (IOException e) {
            throw new RuntimeException("Could not list files");
        }
    }

    @Override
    public boolean deleteFile(String filename) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename);
            return Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Delete failed");
        }
    }
}
