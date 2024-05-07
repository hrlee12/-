package com.chilbaeksan.mokaknyang.chat.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PublishMessage {
    private Integer partyId;
    private Integer senderId;
    private String sendNickname;
    private String contents;
    private String sendTime;
}
