package com.chilbaeksan.mokaknyang.auth.dto;

import com.chilbaeksan.mokaknyang.auth.vo.Token;
import lombok.Builder;
import lombok.NonNull;

@Builder
public record SignInResponse(
        @NonNull String accessToken,
        @NonNull String refreshToken
) {
     public static SignInResponse of(Token token){
         return SignInResponse.builder()
                 .accessToken(token.getAccessToken())
                 .refreshToken(token.getRefreshToken())
                 .build();
     }
}
