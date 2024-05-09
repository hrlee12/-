package com.chilbaeksan.mokaknyang.chat.interceptor;

import com.chilbaeksan.mokaknyang.chat.Handler.UserShakehandHandler;
import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;

import java.security.Principal;
import java.util.List;
import java.util.Objects;

public class FilterChannelInterceptor implements ChannelInterceptor {
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor headerAccessor = MessageHeaderAccessor
                .getAccessor(message, StompHeaderAccessor.class);

        if (StompCommand.CONNECT.equals(headerAccessor.getCommand())) {
            String jwtToken = extractTokenFromHttpRequest(headerAccessor.getNativeHeader("Authorization"));
            headerAccessor.setUser(new JwtPrincipal(jwtToken));
        }
        return message;
    }
    private String extractTokenFromHttpRequest(List<String> authorizationHeaders) {
        // 실제로 JWT 토큰을 추출하는 방법은 요구사항에 따라 다를 수 있습니다.
        // 예를 들어, 요청 헤더에서 토큰을 추출하거나, 쿠키에서 토큰을 추출하는 등의 방법이 있습니다.
        // 여기서는 간단히 헤더에서 추출하는 것으로 가정합니다.

        if (authorizationHeaders != null && !authorizationHeaders.isEmpty()) {
            String authorizationHeader = authorizationHeaders.get(0);
            if (authorizationHeader.startsWith("Bearer ")) {
                return authorizationHeader.substring(7);
            }
        }else{
            throw new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN);
        }
        return null;
    }
    @RequiredArgsConstructor
    private static class JwtPrincipal implements Principal {
        private final String jwtToken;
        @Override
        public String getName() {
            // Principal의 식별자로 JWT 토큰을 반환
            return jwtToken;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            JwtPrincipal that = (JwtPrincipal) obj;
            return Objects.equals(jwtToken, that.jwtToken);
        }

        @Override
        public int hashCode() {
            return Objects.hash(jwtToken);
        }

        @Override
        public String toString(){
            return jwtToken;
        }
    }
}