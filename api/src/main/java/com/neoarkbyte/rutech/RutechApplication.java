package com.neoarkbyte.rutech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@SpringBootApplication
public class RutechApplication {

	public static void main(String[] args) {
		SpringApplication.run(RutechApplication.class, args);
	}

//	@PreAuthorize("hasRole('BATCH_REP')")
	@GetMapping
	public String getIndexPath() {
		return "Welcome to Rutech Event Management System";
	}

	@GetMapping("/test-json")
	public Map<String, Object> hello() {
		Map<String, Object> response = new HashMap<>();
		response.put("message", "Hello from Spring Boot");
		response.put("status", true);
		response.put("code", 200);
		return response;
	}

}
