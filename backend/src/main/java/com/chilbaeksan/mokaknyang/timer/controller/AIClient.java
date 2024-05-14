package com.chilbaeksan.mokaknyang.timer.controller;


import com.chilbaeksan.mokaknyang.timer.dto.TopProcessAIRequestDto;
import com.chilbaeksan.mokaknyang.timer.dto.TopProcessAIResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "ai", url = "https://mogaknyang-ai.duckdns.org")
public interface AIClient {
    @PostMapping("/topprocess")
    TopProcessAIResponseDto isRelatedWithGoal(TopProcessAIRequestDto dto);

}
