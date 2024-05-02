package com.chilbaeksan.mokaknyang.auth.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginInfoDto {
    private Integer memberId;
    private String connectedIP;
    private String refreshToken;
    private String currentProcess;
    private String currentUrl;
}
