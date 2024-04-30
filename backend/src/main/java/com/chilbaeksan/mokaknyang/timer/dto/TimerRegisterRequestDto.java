package com.chilbaeksan.mokaknyang.timer.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TimerRegisterRequestDto {
    private String type;
    private Integer groupId;
    private String startTime;
    private Short endPeriod;
    private Short concentrateTime;
    private Short relaxTime;
}
