package com.chilbaeksan.mokaknyang.chat.Handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Slf4j
@Component
public class UserShakehandHandler extends DefaultHandshakeHandler {
    @Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler,
                                      Map<String, Object> attributes) {
        // HTTP 요청에서 JWT 토큰 추출하여 인증하고 Principal 반환
        String jwtToken = extractTokenFromHttpRequest(request);

        //TODO: Jwt 토큰 인증 단계
        //        Authentication authentication = authenticateWithJWT(jwtToken);
        //        return (Principal) authentication.getPrincipal();
        return new JwtPrincipal(jwtToken);
    }

    // HTTP 요청에서 JWT 토큰 추출
    private String extractTokenFromHttpRequest(ServerHttpRequest request) {
        // 실제로 JWT 토큰을 추출하는 방법은 요구사항에 따라 다를 수 있습니다.
        // 예를 들어, 요청 헤더에서 토큰을 추출하거나, 쿠키에서 토큰을 추출하는 등의 방법이 있습니다.
        // 여기서는 간단히 헤더에서 추출하는 것으로 가정합니다.
        HttpHeaders headers = request.getHeaders();
        List<String> authorizationHeaders = headers.get("token");
        log.info(authorizationHeaders.get(0));
        if (authorizationHeaders != null && !authorizationHeaders.isEmpty()) {
            String authorizationHeader = authorizationHeaders.get(0);
            if (authorizationHeader.startsWith("Bearer ")) {
                return authorizationHeader.substring(7);
            }
        }
        return null;
    }
//
//    // JWT 토큰을 사용하여 인증
//    private Authentication authenticateWithJWT(String jwtToken) {
//        // 여기서는 JWT 토큰을 사용하여 인증을 수행하는 예제 코드입니다.
//        // 실제로는 사용자 서비스 또는 사용자 인증 관리자에서 토큰을 검증하고 사용자 정보를 가져와야 합니다.
//        // 여기서는 간단히 임의의 사용자 정보를 반환하는 코드를 사용합니다.
//        UserDetails userDetails = new User("username", "", Collections.emptyList());
//        return new UsernamePasswordAuthenticationToken(userDetails, jwtToken, userDetails.getAuthorities());
//    }

    // JwtPrincipal 클래스 구현
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
