package com.chilbaeksan.mokaknyang.attack.service;

import com.chilbaeksan.mokaknyang.attack.domain.Attack;
import com.chilbaeksan.mokaknyang.attack.dto.request.AttackRegist;
import com.chilbaeksan.mokaknyang.attack.repository.AttackRepository;
import com.chilbaeksan.mokaknyang.attack_situation.domain.AttackSituation;
import com.chilbaeksan.mokaknyang.attack_situation.dto.request.AttackSituationRegist;
import com.chilbaeksan.mokaknyang.attack_situation.repository.AttackSituationRepository;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import com.chilbaeksan.mokaknyang.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AttackService {
    private final AttackRepository attackRepository;
    private final AttackSituationRepository attackSituationRepository;
    private final MemberRepository memberRepository;

    public Attack registAttack(AttackRegist attackRegist){
        AttackSituation attackSituation = attackSituationRepository.findByAttackSituationId(attackRegist.getAttackSituationId())
                .orElseThrow(() -> new NullPointerException("AttackSituation을 찾아오지 못했습니다."));
        Member hitMember = memberRepository.findByMemberId(attackRegist.getHitMember())
                .orElseThrow(() -> new NullPointerException("공격 멤버를 찾아오지 못했습니다."));
        Member behitMember = memberRepository.findByMemberId(attackRegist.getBehitMember())
                .orElseThrow(() -> new NullPointerException("공격 받은 멤버를 찾아오지 못했습니다."));

        return attackRepository.save(
                Attack.builder()
                        .attackSituation(attackSituation)
                        .hitMember(hitMember)
                        .behitMember(behitMember)
                        .build()
        );
    }
}
