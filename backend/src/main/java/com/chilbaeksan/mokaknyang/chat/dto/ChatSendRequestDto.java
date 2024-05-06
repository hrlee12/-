package com.chilbaeksan.mokaknyang.chat.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatSendRequestDto {
    private Integer partyId;
    private Integer senderId;
    private String content;
    private MessageType type;
}
