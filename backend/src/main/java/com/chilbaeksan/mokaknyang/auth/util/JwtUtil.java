package com.chilbaeksan.mokaknyang.auth.util;


import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Optional;

@RequiredArgsConstructor
@Component
public class JwtUtil {
    public Optional<Integer> getUserId(HttpServletRequest request){
        Integer userId = null;

        //TODO : JWT 적용 하여 데이터 추출하기
        userId = 1;

        return Optional.of(userId);
    }
}
