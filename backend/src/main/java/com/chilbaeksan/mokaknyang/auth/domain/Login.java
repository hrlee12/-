package com.chilbaeksan.mokaknyang.auth.domain;

import com.chilbaeksan.mokaknyang.auth.dto.LoginInfoDto;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@RedisHash(value = "login", timeToLive = 36000)
public class Login {
    @Id
    private Integer memberId;

    private String connectedIP;

    private String refreshToken;

    private String currentProcess;

    private String currentUrl;


    @TimeToLive
    private Long expiration;

    public Login update(LoginInfoDto dto){
        this.memberId = dto.getMemberId();
        this.connectedIP = dto.getConnectedIP();
        this.refreshToken = dto.getRefreshToken();
        this.currentProcess = dto.getCurrentProcess();
        this.currentUrl = dto.getCurrentUrl();
        return this;
    }
}
