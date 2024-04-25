package com.chilbaeksan.mokaknyang.auth.service;

public interface AuthService {

    void register(String id, String password);

    void login(String id, String password);

    void logout(String id);
}
