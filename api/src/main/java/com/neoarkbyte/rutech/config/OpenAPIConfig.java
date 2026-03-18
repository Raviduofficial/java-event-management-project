package com.neoarkbyte.rutech.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI().info(
                new Info()
                        .title("University of Ruhuna Event Management API")
                        .description("REST API for managing events, participants, and tickets for the University of Ruhuna")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("NeoArkByte"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT"))
        );
    }
}
