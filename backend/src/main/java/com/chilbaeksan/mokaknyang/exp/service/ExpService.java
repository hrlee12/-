package com.chilbaeksan.mokaknyang.exp.service;

import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
import com.chilbaeksan.mokaknyang.exp.domain.Exp;
import com.chilbaeksan.mokaknyang.exp.domain.ExpType;
import com.chilbaeksan.mokaknyang.exp.repository.ExpRepository;
import com.chilbaeksan.mokaknyang.member.domain.Level;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import com.chilbaeksan.mokaknyang.member.repository.LevelRepository;
import com.chilbaeksan.mokaknyang.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExpService {
    private final LevelRepository levelRepository;
    private final MemberRepository memberRepository;
    private final ExpRepository expRepository;

    @Transactional
    public void getExp(Member member, String message, Integer relatedId, Short exp){
        Exp expEntity = Exp.builder()
                .expType(ExpType.TIMER)
                .expContents(message)
                .member(member)
                .expRelatedId(relatedId)
                .expQuantity(exp)
                .build();

        member.setExp(member.getExp() + 10);

        expRepository.save(expEntity);

        levelUp(member);
    }

    @Transactional
    public void levelUp(Member member){
        // 레벨업 로직
        Level level = levelRepository.findById(member.getLevel().getLevel())
                .orElseThrow(() -> new BaseException(ErrorCode.LEVEL_INVALID_VALUE));

        while(member.getExp() >= level.getLevelExp() && member.getLevel().getLevel() < 999){
            level = levelRepository.findById((short) (member.getLevel().getLevel() + 1))
                    .orElseThrow(()->new BaseException(ErrorCode.LEVEL_INVALID_VALUE));
            member.setLevel(level);
        }
    }
}
