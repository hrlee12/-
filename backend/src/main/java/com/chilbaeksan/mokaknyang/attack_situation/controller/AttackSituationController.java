package com.chilbaeksan.mokaknyang.attack_situation.controller;

import com.chilbaeksan.mokaknyang.attack_situation.dto.request.AttackSituationRegist;
import com.chilbaeksan.mokaknyang.attack_situation.service.AttackSituationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/attack/situation")
public class AttackSituationController {
    private final AttackSituationService attackSituationService;
    @PostMapping
    public void registAttackSituation(@RequestBody AttackSituationRegist attackSituationRegist){
        attackSituationService.registAttackSituation(attackSituationRegist);
    }
}
