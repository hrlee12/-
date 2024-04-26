package com.chilbaeksan.mokaknyang.member.controller;

import com.chilbaeksan.mokaknyang.auth.dto.UserLoginDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
public class MemberController {

    @GetMapping
    public ResponseEntity<?> getUserInfo(UserLoginDto dto) {

        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<?> setUserInfo(@RequestBody UserLoginDto dto) {

        return ResponseEntity.ok().build();
    }

    @PatchMapping
    public ResponseEntity<?> modifyUserInfo(@RequestBody UserLoginDto dto) {

        return ResponseEntity.ok().build();
    }
}
