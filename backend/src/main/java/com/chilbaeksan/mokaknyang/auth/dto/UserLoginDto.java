package com.chilbaeksan.mokaknyang.auth.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserLoginDto {
    String id;
    String password;
    String nickname;
}
