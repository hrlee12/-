package com.chilbaeksan.mokaknyang.timer.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TimerResultRequestDto {
    private Integer timerId;
    private Short period;
}
