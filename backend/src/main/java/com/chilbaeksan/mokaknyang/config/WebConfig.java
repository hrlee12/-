package com.chilbaeksan.mokaknyang.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:5174", "https://mogaknyan.duckdns.org") // 모든 출처 허용
                .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH", "TRACE") // 모든 HTTP 메소드 허용
                .allowedHeaders("Content-Type", "Authorization") // 모든 헤더 허용
                .allowCredentials(true) // 쿠키를 포함시키기 위해 필요
                .maxAge(3600); // 사전 요청(pre-flight request) 캐싱 시간
    }
}

