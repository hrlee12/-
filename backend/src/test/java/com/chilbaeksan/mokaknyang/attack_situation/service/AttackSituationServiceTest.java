package com.chilbaeksan.mokaknyang.attack_situation.service;

import com.chilbaeksan.mokaknyang.attack_situation.domain.AttackSituation;
import com.chilbaeksan.mokaknyang.attack_situation.domain.AttackSituationCode;
import com.chilbaeksan.mokaknyang.attack_situation.dto.request.AttackSituationRegist;
import com.chilbaeksan.mokaknyang.attack_situation.repository.AttackSituationRepository;
import com.chilbaeksan.mokaknyang.party.repository.PartyRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class AttackSituationServiceTest {
    @InjectMocks
    private AttackSituationService attackSituationService;

    @Mock
    private AttackSituationRepository attackSituationRepository;

    @Mock
    private PartyRepository groupRepository;

    @Test
    @DisplayName("공격 상황 등록 테스트")
    void registAttackSituation() {
        //given
        AttackSituationRegist mockAttackSituationRegist = AttackSituationRegist.builder()
                .groupId(1)
                .attackSituationCode(AttackSituationCode.AWAY)
                .build();

        //when
        AttackSituation attackSituation = attackSituationService.registAttackSituation(mockAttackSituationRegist);

        //then
        verify(attackSituationRepository).save(attackSituation);
    }
}