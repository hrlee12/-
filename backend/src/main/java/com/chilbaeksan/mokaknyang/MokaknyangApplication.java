package com.chilbaeksan.mokaknyang;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class MokaknyangApplication {

	public static void main(String[] args) {
		SpringApplication.run(MokaknyangApplication.class, args);
	}

}
