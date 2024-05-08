package com.chilbaeksan.mokaknyang.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatListRequestDto {
    @Builder.Default
    private int pageNum=1;
    @Builder.Default
    private int pageSize=10;
}
