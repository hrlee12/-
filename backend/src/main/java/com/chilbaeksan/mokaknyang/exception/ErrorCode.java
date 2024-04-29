package com.chilbaeksan.mokaknyang.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {

    //맴버 관련 에러
    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    MEMBER_IS_NOT_LOGIN(404, "로그인 되어 있지 않습니다."),

    MEMBER_INFO_REGISTER_BAD_REQUEST(400, "회원 정보 등록 요청이 잘못된 요청 형식 입니다." ),
    MEMBER_INFO_REGISTER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    MEMBER_INFO_REGISTER_NOT_FOUND_RESOURCE_CAT(404, "수정하려는 고양이 스킨이 존재하지 않습니다."),

    MEMBER_MODIFY_BAD_REQUEST(400, "회원 수정 요청이 잘못된 요청 형식 입니다."),
    MEMBER_MODIFY_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    MEMBER_MODIFY_NOT_FOUND_RESOURCE_CAT(404, "수정하려는 고양이 스킨이 존재하지 않습니다."),

    MEMBER_SEARCH_BAD_REQUEST(400, "회원 검색 요청이 잘못된 요청 형식 입니다."),

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

    // 공격 관련 에러

    // 뽀모도로 관련 에러

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

    //공통 에러
    BAD_REQUEST(400, "올바르지 않은 요청입니다."),
    INTERNAL_SERVER_ERROR(500, "내부 서버 오류 발생으로 요청에 실패하였습니다.");
    ;
    private final int resultCode;
    private final String message;
}
