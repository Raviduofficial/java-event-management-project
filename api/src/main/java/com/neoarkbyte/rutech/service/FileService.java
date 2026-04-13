package com.neoarkbyte.rutech.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileService {

    String uploadFile(MultipartFile file);

    Resource downloadFile(String filename);

    List<String> listFiles();

    boolean deleteFile(String filename);
}