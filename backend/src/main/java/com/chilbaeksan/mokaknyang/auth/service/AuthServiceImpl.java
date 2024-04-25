package com.chilbaeksan.mokaknyang.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final RedisTemplate<String,Object> redisTemplate; // redis 불러오기


    @Override
    public void register(String id, String password) {

    }

    @Override
    public void login(String id, String password) {

    }

    @Override
    public void logout(String id) {

    }
}
