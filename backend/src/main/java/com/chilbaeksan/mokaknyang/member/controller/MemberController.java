package com.chilbaeksan.mokaknyang.member.controller;

import com.chilbaeksan.mokaknyang.auth.util.JwtUtil;
import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import com.chilbaeksan.mokaknyang.member.domain.Title;
import com.chilbaeksan.mokaknyang.member.dto.*;
import com.chilbaeksan.mokaknyang.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
public class MemberController {
    private final JwtUtil jwtUtil;
    private final MemberService memberService;

    @GetMapping
    public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
        // 유저 아이디 추출
        Integer userId = jwtUtil.getUserId(request)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN)); // 없으면 로그인 안된거임

        Member result = memberService.getMyInfo(userId)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND)); // DB에서 찾을 수 없음

        MemberMyInfoResponseDto response = MemberMyInfoResponseDto.builder()
                .memberExp(result.getExp())
                .memberCreatedAt(result.getCreatedAt().toString())
                .memberCatName(result.getCatName())
                .memberHitNumber(result.getHitNumber())
                .memberBehitNumber(result.getBehitNumber())
                .memberGoal(result.getGoal())
                .level(result.getLevel().getLevelExp())
                .titleContent(result.getTitle().getTitleContent())
                .catAssetUrl(result.getCat().getCatAssetUrl())
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> setUserInfo(@RequestBody MemberRegisterRequestDto dto, HttpServletRequest request) {
        // 유저 아이디 추출
        Integer userId = jwtUtil.getUserId(request)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN)); // 없으면 로그인 안된거임

        memberService.setMyInfo(dto, userId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping
    public ResponseEntity<?> modifyUserInfo(@RequestBody MemberModifyRequestDto dto, HttpServletRequest request) {
        // 유저 아이디 추출
        Integer userId = jwtUtil.getUserId(request)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN)); // 없으면 로그인 안된거임

        memberService.modifyMyInfo(dto,userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchMember(MemberSearchRequestDto dto, HttpServletRequest request){
        // 유저 아이디 추출
        Integer userId = jwtUtil.getUserId(request)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN)); // 없으면 로그인 안된거임

        Member member = memberService.findMemberByUserId(dto.getUserId());

        MemberSearchResponseDto result = MemberSearchResponseDto.builder()
                .memberId(member.getMemberId())
                .build();

        return ResponseEntity.ok(result);
    }

    @GetMapping("/title")
    public ResponseEntity<?> getTitles(MemberTitleRequestDto dto, HttpServletRequest request){
        // 유저 아이디 추출
        Integer userId = jwtUtil.getUserId(request)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN)); // 없으면 로그인 안된거임

        Pageable pageable = PageRequest.of(dto.getPageNum(), dto.getPageSize());

        List<Title> titles = memberService.getTitles(pageable);

        MemberTitleResponseDto result = MemberTitleResponseDto.builder()
                .titles( titles.stream().map((m) -> MemberTitleResponseDto.TitleDto.builder()
                                .titleId(m.getTitleId())
                                .titleContent(m.getTitleContent())
                                .titleAchieveLevel(m.getTitleAchieveLevel().getLevel())
                                .build()).toList())
                .build();

        return ResponseEntity.ok(result);
    }
}
