package com.neoarkbyte.rutech.service.impl.file;

import com.neoarkbyte.rutech.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
public class FileValidationDecorator implements FileService {

    private final FileService fileService;

    @Override
    public String uploadFile(MultipartFile file) {
        validate(file);
        return fileService.uploadFile(file);
    }

    @Override
    public Resource downloadFile(String filename) {
        return fileService.downloadFile(filename);
    }

    @Override
    public List<String> listFiles() {
        return fileService.listFiles();
    }

    @Override
    public boolean deleteFile(String filename) {
        return fileService.deleteFile(filename);
    }

    private void validate(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        String contentType = file.getContentType();

        if (contentType == null) {
            throw new RuntimeException("Unknown file type");
        }

        boolean allowed =
                contentType.equals("application/pdf") ||
                        contentType.equals("image/png") ||
                        contentType.equals("image/jpeg");

        if (!allowed) {
            throw new RuntimeException("Only PDF, PNG, JPG files are allowed");
        }
    }
}