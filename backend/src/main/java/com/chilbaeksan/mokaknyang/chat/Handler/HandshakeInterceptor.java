package com.chilbaeksan.mokaknyang.chat.Handler;

import com.chilbaeksan.mokaknyang.auth.util.JwtUtil;
import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
import com.chilbaeksan.mokaknyang.member.dto.MemberConstant;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class HandshakeInterceptor extends HttpSessionHandshakeInterceptor {
    private final JwtUtil jwtUtil;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        if(request instanceof ServletServerHttpRequest){
            ServletServerHttpRequest servletServerHttpRequest = (ServletServerHttpRequest) request;
            HttpServletRequest httpServletRequest = servletServerHttpRequest.getServletRequest();
            Integer userId = jwtUtil.getUserId(httpServletRequest)
//                    .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN));
        .orElse(1);
            attributes.put(MemberConstant.HEADER_USER_KEY.getKey(), userId);
        }
        return super.beforeHandshake(request, response, wsHandler, attributes);
    }
}
