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
    String memberId;
    String connectedIP;
    String refreshToken;
}
