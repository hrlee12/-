package com.chilbaeksan.mokaknyang.config;

import com.chilbaeksan.mokaknyang.chat.Handler.HandshakeInterceptor;
import com.chilbaeksan.mokaknyang.member.dto.MemberConstant;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.*;
import org.springframework.web.socket.handler.WebSocketHandlerDecorator;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketMessageBrokerConfig implements WebSocketMessageBrokerConfigurer{
    private final HandshakeInterceptor handshakeInterceptor; // jwt 인증

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/sub/chat");
        config.setApplicationDestinationPrefixes("/pub/chat");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .addInterceptors(handshakeInterceptor)
                .withSockJS();
    }
    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registry) {
        registry.addDecoratorFactory((transportHandler) -> new WebSocketHandlerDecorator(transportHandler) {
            @Override
            public void afterConnectionEstablished(WebSocketSession session) throws Exception {
                Integer userId = Integer.valueOf((String) session.getAttributes().get(MemberConstant.HEADER_USER_KEY.getKey()));
                // 사용자 ID 활용

                super.afterConnectionEstablished(session);
            }
        });
    }
}