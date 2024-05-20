package com.chilbaeksan.mokaknyang.chat.dto;

import com.fasterxml.jackson.core.SerializableString;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PublishMessage implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private Integer partyId;
    private Integer senderId;
    private String sendNickname;
    private String contents;
    private String sendTime;
}
