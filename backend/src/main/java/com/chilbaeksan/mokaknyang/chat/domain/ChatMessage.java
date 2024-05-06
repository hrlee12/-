package com.chilbaeksan.mokaknyang.chat.domain;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document(collection = "chat")
public class ChatMessage {
    @Id
    private String id;
    @Indexed
    private Integer partyId;
    private Integer senderId;
    private String senderNickname;
    private String contents;
    private String sendTime;
}