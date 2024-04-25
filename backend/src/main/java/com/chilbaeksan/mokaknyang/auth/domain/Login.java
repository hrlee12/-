package com.chilbaeksan.mokaknyang.auth.domain;

import com.chilbaeksan.mokaknyang.auth.dto.LoginInfoDto;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@RedisHash(value = "login")
public class Login {
    @Id
    private String memberId;

    private String connectedIP;

    private String refreshToken;

    public Login update(LoginInfoDto dto){
        this.memberId = dto.getMemberId();
        this.connectedIP = dto.getConnectedIP();
        this.refreshToken = dto.getRefreshToken();
        return this;
    }
}
