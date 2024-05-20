package com.chilbaeksan.mokaknyang.timer.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TimerTopProcessRequestDto {
    private String top;
    private String url;
}
