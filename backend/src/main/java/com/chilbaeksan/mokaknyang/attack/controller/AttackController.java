package com.chilbaeksan.mokaknyang.attack.controller;

import com.chilbaeksan.mokaknyang.attack.dto.request.AttackRegist;
import com.chilbaeksan.mokaknyang.attack.service.AttackService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/attack")
public class AttackController {
    private final AttackService attackService;

    @PostMapping
    public void registAttack(@RequestBody AttackRegist attackRegist){
        attackService.registAttack(attackRegist);
    }
}
