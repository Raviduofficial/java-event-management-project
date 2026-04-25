package com.neoarkbyte.rutech.config;

import com.neoarkbyte.rutech.service.FileService;
import com.neoarkbyte.rutech.service.impl.file.FileValidationDecorator;
import com.neoarkbyte.rutech.service.impl.file.LocalFileService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FileServiceConfig {

    @Bean
    public FileService fileService(LocalFileService localFileService) {
        return new FileValidationDecorator(localFileService);
    }
}