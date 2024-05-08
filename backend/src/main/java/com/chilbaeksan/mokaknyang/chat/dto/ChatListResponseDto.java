package com.chilbaeksan.mokaknyang.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatListResponseDto {

    private List<MessageDto> chatMessages;

    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MessageDto {
        private Integer userId;
        private String userNickname;
        private String contents;
        private String sendTime;
    }
}
