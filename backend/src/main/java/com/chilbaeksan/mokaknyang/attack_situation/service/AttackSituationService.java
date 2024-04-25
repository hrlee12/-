package com.chilbaeksan.mokaknyang.attack_situation.service;

import com.chilbaeksan.mokaknyang.attack_situation.domain.AttackSituation;
import com.chilbaeksan.mokaknyang.attack_situation.dto.request.AttackSituationRegist;
import com.chilbaeksan.mokaknyang.attack_situation.repository.AttackSituationRepository;
import com.chilbaeksan.mokaknyang.group.domain.Group;
import com.chilbaeksan.mokaknyang.group.repository.GroupRepository;
import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AttackSituationService {
    private final AttackSituationRepository attackSituationRepository;
    private final GroupRepository groupRepository;

    public void registAttackSituation(AttackSituationRegist attackSituationRegist){
        Group group = groupRepository.findByGroupId(attackSituationRegist.getGroupId())
                .orElseThrow();

        attackSituationRepository.save(
                AttackSituation.builder()
                .group(group)
                .attackSituationCode(attackSituationRegist.getAttackSituationCode())
                .build());
    }
}
