package com.chilbaeksan.mokaknyang.attack_situation.service;

import com.chilbaeksan.mokaknyang.attack_situation.domain.AttackSituation;
import com.chilbaeksan.mokaknyang.attack_situation.domain.AttackSituationCode;
import com.chilbaeksan.mokaknyang.attack_situation.dto.request.AttackSituationRegist;
import com.chilbaeksan.mokaknyang.attack_situation.repository.AttackSituationRepository;
import com.chilbaeksan.mokaknyang.party.domain.Party;
import com.chilbaeksan.mokaknyang.party.repository.PartyRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.NoSuchElementException;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
@ExtendWith(MockitoExtension.class)
class AttackSituationServiceTest {
    @InjectMocks
    private AttackSituationService attackSituationService;

    @Mock
    private AttackSituationRepository attackSituationRepository;

    @Mock
    private PartyRepository partyRepository;

    @Test
    @DisplayName("공격 상황 등록 테스트")
    void registAttackSituation() {
        // Given (준비)
        Party party = Party.builder().partyId(1).build();
        given(partyRepository.findByPartyId(1)).willReturn(Optional.ofNullable(party));

        AttackSituationRegist attackSituationRegist = AttackSituationRegist.builder().partyId(party.getPartyId()).attackSituationCode(AttackSituationCode.AWAY).build();
        AttackSituation attackSituation = AttackSituation.builder().party(party).attackSituationCode(AttackSituationCode.AWAY).build();
        given(attackSituationRepository.save(any())).willReturn(attackSituation);

        // When (실행)
        Party getParty = partyRepository.findByPartyId(1)
                .orElseThrow(() -> new NoSuchElementException("Value not present"));

        AttackSituation getAttackSituation = attackSituationService.registAttackSituation(attackSituationRegist);

        // Then (검증 및 결과 확인)
        Assertions.assertEquals(getParty.getPartyId(), getAttackSituation.getParty().getPartyId());
    }
}