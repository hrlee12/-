package com.chilbaeksan.mokaknyang.config;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients(basePackages = "com.chilbaeksan.mokaknyang")
public class FeignClientConfig {
}