package com.chilbaeksan.mokaknyang.chat.interceptor;

import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
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

        if (authorizationHeaders != null && !authorizationHeaders.isEmpty()) {
            String authorizationHeader = authorizationHeaders.get(0);
            if (authorizationHeader.startsWith("Bearer ")) {
                return authorizationHeader.substring(7);
            }
        }else{
            throw new RuntimeException("사용자가 로그인되어 있지 않습니다");
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