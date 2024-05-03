package com.chilbaeksan.mokaknyang.attack.service;

import com.chilbaeksan.mokaknyang.attack.domain.Attack;
import com.chilbaeksan.mokaknyang.attack.dto.request.AttackRegist;
import com.chilbaeksan.mokaknyang.attack.repository.AttackRepository;
import com.chilbaeksan.mokaknyang.attack_situation.domain.AttackSituation;
import com.chilbaeksan.mokaknyang.attack_situation.repository.AttackSituationRepository;
import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
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
                .orElseThrow(() -> new BaseException(ErrorCode.ATTACK_SITUATION_NOT_FOUND));

        Member hitMember = memberRepository.findByMemberId(attackRegist.getHitMember())
                .orElseThrow(() -> new BaseException(ErrorCode.ATTACK_HIT_MEMBER_NOT_FOUND));

        hitMember.hit();
        memberRepository.save(hitMember);

        Member behitMember = memberRepository.findByMemberId(attackRegist.getBehitMember())
                .orElseThrow(() -> new BaseException(ErrorCode.ATTACK_BEHIT_MEMBER_NOT_FOUND));

        behitMember.behit();
        memberRepository.save(behitMember);

        return attackRepository.save(
                Attack.builder()
                        .attackSituation(attackSituation)
                        .hitMember(hitMember)
                        .behitMember(behitMember)
                        .build()
        );
    }
}
