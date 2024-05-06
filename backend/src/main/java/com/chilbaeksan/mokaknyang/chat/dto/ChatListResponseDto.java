package com.chilbaeksan.mokaknyang.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatListResponseDto {
    private String userId;
    private String userNickname;
    private String contents;
    private String sendTime;
}
