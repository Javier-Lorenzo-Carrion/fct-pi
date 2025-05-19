package com.lorenzoconsulting.mortgage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.lorenzoconsulting.mortgage.infrastructure.persistence.entities")
@EnableJpaRepositories("com.lorenzoconsulting.mortgage.infrastructure.persistence.jpa")
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }


}
