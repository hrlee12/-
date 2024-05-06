package com.chilbaeksan.mokaknyang;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableMongoRepositories(basePackages = "com.chilbaeksan.mokaknyang.chat.repository")
@SpringBootApplication
public class MokaknyangApplication {

	public static void main(String[] args) {
		SpringApplication.run(MokaknyangApplication.class, args);
	}

}
