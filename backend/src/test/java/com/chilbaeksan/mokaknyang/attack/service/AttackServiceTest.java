package com.chilbaeksan.mokaknyang.attack.service;

import com.chilbaeksan.mokaknyang.attack.domain.Attack;
import com.chilbaeksan.mokaknyang.attack.dto.request.AttackRegist;
import com.chilbaeksan.mokaknyang.attack.repository.AttackRepository;
import com.chilbaeksan.mokaknyang.attack_situation.domain.AttackSituation;
import com.chilbaeksan.mokaknyang.attack_situation.repository.AttackSituationRepository;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import com.chilbaeksan.mokaknyang.member.repository.MemberRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class AttackServiceTest {
    @InjectMocks
    private AttackService attackService;

    @Mock
    private AttackRepository attackRepository;

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private AttackSituationRepository attackSituationRepository;

    @Test
    @DisplayName("공격 등록 테스트")
    void registAttack() {
        // Given (준비)
        Member hitMember = Member.builder()
                .memberId(1)
                .hitNumber(0)
                .build();

        Member behitMember = Member.builder()
                .memberId(2)
                .behitNumber(0)
                .build();

        AttackSituation attackSituation = AttackSituation.builder()
                .attackSituationId(1)
                .build();

        Attack attack = Attack.builder()
                .attackId(1)
                .attackSituation(attackSituation)
                .hitMember(hitMember)
                .behitMember(behitMember)
                .build();

        given(memberRepository.findByMemberId(1)).willReturn(Optional.ofNullable(hitMember));
        given(memberRepository.findByMemberId(2)).willReturn(Optional.ofNullable(behitMember));
        given(attackSituationRepository.findByAttackSituationId(1)).willReturn(Optional.ofNullable(attackSituation));

        given(attackRepository.save(any())).willReturn(attack);

        // When (실행)
        Attack saveAttack = attackService.registAttack(AttackRegist.builder()
                .attackSituationId(1)
                .hitMember(1)
                .behitMember(2)
                .build());

        // Then (검증 및 결과 확인)
        Assertions.assertEquals(saveAttack.getHitMember().getHitNumber() , 1);
        Assertions.assertEquals(saveAttack.getBehitMember().getBehitNumber(), 1);
        Assertions.assertEquals(saveAttack.getAttackSituation().getAttackSituationId(), 1);
        Assertions.assertEquals(saveAttack.getHitMember().getMemberId(), 1);
        Assertions.assertEquals(saveAttack.getBehitMember().getMemberId(), 2);
    }
}