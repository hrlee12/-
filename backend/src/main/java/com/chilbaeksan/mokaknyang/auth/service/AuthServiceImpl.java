package com.chilbaeksan.mokaknyang.auth.service;

import com.chilbaeksan.mokaknyang.auth.domain.Login;
import com.chilbaeksan.mokaknyang.auth.dto.LoginInfoDto;
import com.chilbaeksan.mokaknyang.auth.dto.SignInResponse;
import com.chilbaeksan.mokaknyang.auth.dto.UserLoginDto;
import com.chilbaeksan.mokaknyang.auth.repository.LoginRepository;
import com.chilbaeksan.mokaknyang.auth.vo.Token;
import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
import com.chilbaeksan.mokaknyang.member.domain.Cat;
import com.chilbaeksan.mokaknyang.member.domain.Level;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import com.chilbaeksan.mokaknyang.member.domain.Title;
import com.chilbaeksan.mokaknyang.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final MemberRepository memberRepository;
    private final LoginRepository loginRepository;


    @Transactional
    @Override
    public void register(UserLoginDto dto) {
        // 중복 확인
        Optional<Member> user = memberRepository.findByLoginId(dto.getId());
        if(user.isPresent()){
            throw new BaseException(ErrorCode.AUTH_REGISTER_DUPLICATED_USER); // 중복 에러
        }

        //TODO: 아이디, 비밀번호 최소 조건 확인 로직

        // 가입 수행
        Member member = Member.builder()
                .cat(Cat.builder().catId(1).build())
                .level(Level.builder().level((short) 1).build())
                .title(Title.builder().titleId((short) 1).build())
                .exp(0)
                .loginId(dto.getId())
                .loginPwd(dto.getPassword())
                .catName(dto.getNickname())
                .build();
        memberRepository.save(member);
    }

    @Override
    public SignInResponse login(String id, String password, String ip) {
        // 로그인 진행
        Member user = memberRepository.findByLoginIdAndLoginPwd(id, password)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND)); // 없는 맴버면 없다고 오류 내기

        // 중복 로그인 확인 - redis
        Optional<Login> loginInfo = loginRepository.findByMemberId(user.getMemberId());

        //누가 로그인 중 이라면
        if(loginInfo.isPresent()){
            //다른 아이피가 연결 중이라면
            if(!loginInfo.get().getConnectedIP().equals(ip)){
                throw new BaseException(ErrorCode.AUTH_LOGIN_ALREADY_LOGINED);
            }
        }

        //TODO: JWT access, refresh 토큰 생성
        Token token = new Token(String.valueOf(user.getMemberId()),String.valueOf(user.getMemberId())); // 임시로 현재 맴버 아이디와 현재 시간으로 대체한다.

        //Redis에 저장하기
        Login login = Login.builder()
                .memberId(user.getMemberId())
                .refreshToken(token.getRefreshToken())
                .connectedIP(ip)
                .build();
        loginRepository.save(login);

        return SignInResponse.of(token);
    }

    @Override
    public void logout(Integer userId) {
       Login login = loginRepository.findByMemberId(userId)
               .orElseThrow(()-> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN));

       loginRepository.delete(login);
    }

    @Override
    public String createHttpOnlyCookie(String cookieName, String cookieValue) {
        int maxAge = 60 * 60 * 24;

        ResponseCookie cookie = ResponseCookie.from(cookieName, cookieValue)
                .path("/")
                .sameSite("None")
                .httpOnly(true)
                .secure(true)
                .maxAge(maxAge)
                .build();

        return cookie.toString();
    }

    @Override
    //리프레시 토큰 담긴 쿠키 만료 시키기
    public String setHttpOnlyCookieInvalidate(String cookieName){
        ResponseCookie cookie = ResponseCookie.from(cookieName, null)
                .path("/")
                .sameSite("None")
                .httpOnly(true)
                .secure(true)
                .maxAge(0) // 쿠키 바로 만료
                .build();

        return cookie.toString();
    }


    @Transactional
    @Override
    public Token refresh(String refreshToken) {
        //TODO: JWT access, refresh 토큰 생성
        String userId = refreshToken;
        Token token = new Token(userId, userId); // 임시로 현재 맴버 아이디와 현재 시간으로 대체한다.
        Login login = loginRepository.findByMemberId(Integer.valueOf(userId))
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN));
        login.setRefreshToken(token.getRefreshToken());
        return token;
    }
}
