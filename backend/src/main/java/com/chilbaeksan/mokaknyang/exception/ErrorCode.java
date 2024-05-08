package com.chilbaeksan.mokaknyang.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {

    //맴버 관련 에러
    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    MEMBER_IS_NOT_LOGIN(404, "로그인 되어 있지 않습니다."),
    MEMBER_ALREADY_REMOVE(410, "이미 삭제된 회원입니다."),

    MEMBER_INFO_REGISTER_BAD_REQUEST(400, "회원 정보 등록 요청이 잘못된 요청 형식 입니다." ),
    MEMBER_INFO_REGISTER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    MEMBER_INFO_REGISTER_NOT_FOUND_RESOURCE_CAT(404, "수정하려는 고양이 스킨이 존재하지 않습니다."),

    MEMBER_MODIFY_BAD_REQUEST(400, "회원 수정 요청이 잘못된 요청 형식 입니다."),
    MEMBER_MODIFY_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    MEMBER_MODIFY_NOT_FOUND_RESOURCE_CAT(404, "수정하려는 고양이 스킨이 존재하지 않습니다."),

    MEMBER_SEARCH_BAD_REQUEST(400, "회원 검색 요청이 잘못된 요청 형식 입니다."),
    MEMBER_SEARCH_NOT_FOUND_USER_ID(404,  "해당 회원의 아이디가 존재하지 않습니다."),
    CAT_NOT_FOUND(404, "고양이를 찾을 수 없습니다."),
    CAT_IS_NULL(404, "고양이에 null 값이 들어가있습니다."),

    //Auth 관련 에러
    AUTH_REGISTER_BAD_REQUEST(400, "회원가입 요청이 잘못된 요청 형식 입니다."),
    AUTH_REGISTER_DUPLICATED_USER(409,"이미 있는 회원아이디 입니다."),
    AUTH_REGISTER_SECURITY_POLICY(400, "비밀번호 최소 조건을 맞추지 못해 가입에 실패했습니다."),

    AUTH_LOGIN_BAD_REQUEST(400, "로그인 요청이 잘못된 요청 형식 입니다."),
    AUTH_LOGIN_FAILED(403,  "로그인에 실패하였습니다"),
    AUTH_LOGIN_DIFFERENT_IP_LOGINED(403,  "다른 IP에서 이미 로그인이 되어있습니다."),
    AUTH_LOGIN_ALREADY_LOGINED(403, "이미 로그인이 되어있습니다."),

    AUTH_LOGOUT_BAD_REQUEST(400, "로그아웃 요청이 잘못된 요청 형식 입니다."),
    AUTH_LOGOUT_UNAUTHORIZED(401, "권한이 없습니다."),
    AUTH_LOGOUT_NOT_FOUND_MEMBER(404, "사용자 정보를 찾을 수 없습니다."),

    // 채팅 관련 에러
    CHAT_BAD_REQUEST(400, "채팅전송이 잘못된 요청 형식 입니다."),
    CHAT_UNAUTHORIZED(401, "해당 그룹에 대한 채팅 권한이 없습니다."),

    // 공격 관련 에러
    ATTACK_HIT_MEMBER_NOT_FOUND(404, "공격한 사용자를 찾을 수 없습니다."),
    ATTACK_BEHIT_MEMBER_NOT_FOUND(404, "공격 당한 사용자를 찾을 수 없습니다."),

    //공격 상황 관련 에러
    ATTACK_SITUATION_NOT_FOUND(404, "공격 상황 정보를 찾을 수 없습니다."),

    // 뽀모도로 관련 에러
    TIMER_REGISTER_BAD_REQUEST(400, "뽀모도로 타이머 생성요청이 잘못된 요청 형식 입니다."),
    TIMER_REGISTER_UNAUTHORIZED(401, "해당 그룹에서 타이머 생성권한이 없습니다."),
    TIMER_REGISTER_GROUP_ID_NOT_FOUND(404,"해당 그룹 아이디가 존재하지 않습니다."),
    TIMER_TOP_PROCESS_BAD_REQUEST(400, "작업 변경 요청이 잘못된 요청 형식 입니다."),
    TIMER_TOP_PROCESS_UNAUTHORIZED(401,"현재 프로세스 상태 변경 권한이 없습니다."),
    TIMER_RESULT_BAD_REQUEST(400,  "뽀모도로 산정 요청이 잘못된 요청 형식 입니다."),
    TIMER_RESULT_UNAUTHORIZED(401,"뽀모도로 산정에 대한 권한이 없습니다."),

    // 그룹 관련 에러
    PARTY_NOT_FOUND(404, "파티를 찾을 수 없습니다."),
    PARTY_INVITATION_REGISTER_BAD_REQUEST(400, "파티 초대 요청이 잘못된 요청 형식 입니다." ),
    PARTY_INVITATION_ALREADY(409, "이미 초대한 사용자입니다."),
    PARTY_MAX_INVITATION(403, "초대 가능한 사용자 수가 최대에 도달했습니다."),
    PARTY_SELF_INVITATION_NOT_ALLOWED(403, "자기 자신을 초대할 수 없습니다."),
    PARTY_ALREADY_REMOVE(410, "이미 삭제된 파티입니다."),
    PARTY_IS_NOT_VALID(408, "초대 요청이 더 이상 유효하지 않습니다."),
    PARTY_ALREADY_ACCEPT(408, "이미 초대를 수락하였습니다."),

    //멤버 파티 관련 에러
    MEMBER_PARTY_NOT_FOUND(404, "파티를 수락한 멤버를 찾을 수 없습니다."),
    MEMBER_PARTY_UNAUTHORIZATION(401,"해당 맴버가 해당 파티에 접근권한이 없습니다."),

    //초대 관련 에러
    INVITATION_NOT_FOUND(404, "초대장이 존재하지 않습니다."),
    INVIATION_IS_NOT_VALID(408, "초대장이 더 이상 유효하지 않습니다."),


    //레벨 관련 에러
    LEVEL_INVALID_VALUE(400, "유효하지 않는 레벨입니다."),
    LEVEL_NOT_ENOUGH_LEVEL(401, "레벨이 충분하지 않습니다."),


    //공통 에러
    BAD_REQUEST(400, "올바르지 않은 요청입니다."),
    INTERNAL_SERVER_ERROR(500, "내부 서버 오류 발생으로 요청에 실패하였습니다.");

    private final int resultCode;
    private final String message;
}
