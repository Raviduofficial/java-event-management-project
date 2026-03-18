package com.neoarkbyte.rutech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class RutechApplication {

	public static void main(String[] args) {
		SpringApplication.run(RutechApplication.class, args);
	}

	@GetMapping
	public String getIndexPath() {
		return "Welcome to Rutech Event Management System";
	}

}
