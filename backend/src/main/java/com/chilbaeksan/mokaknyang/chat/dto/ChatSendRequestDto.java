package com.chilbaeksan.mokaknyang.chat.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatSendRequestDto {
    private String contents;
}
