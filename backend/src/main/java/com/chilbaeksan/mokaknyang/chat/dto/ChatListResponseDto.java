package com.chilbaeksan.mokaknyang.chat.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatListResponseDto {

    private List<ChatListResponseDto.MessageDto> chatMessages;

    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class MessageDto {
        private Integer userId;
        private String userNickname;
        private String contents;
        private String sendTime;
    }
}
