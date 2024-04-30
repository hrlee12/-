import BasicFrame from '@/components/frame/basicFrame';
import InputBox from '@/components/inputbox';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/button';
import InfoHover from './info/InfoHover';

const SignUpPage = () => {
  const [userid, setUserId] = useState('');
  const [usernickname, setUserNickname] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();

  // 기타 조건 추가 등 수정 예정
  const signUp = (userid: string, usernickname: string, password: string) => {
    if (
      userid &&
      usernickname &&
      password &&
      isPasswordValid(password) &&
      passwordMatch
    ) {
      console.log(
        'id = ' +
          userid +
          'nickname = ' +
          usernickname +
          '  pw = ' +
          password +
          '\n 정상, API 연결 예정',
      );
    } else if (!isPasswordValid(password)) {
      console.log('비밀번호 조건을 다시 확인해주세요');
    }
  };

  const isPasswordValid = (password: string): boolean => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{5,9}$/;

    return regex.test(password);
  };

  const checkPasswordMatch = useCallback(() => {
    setPasswordMatch(password === password2);
  }, [password, password2]);

  useEffect(() => {
    checkPasswordMatch();
  }, [checkPasswordMatch]);

  return (
    <div>
      <BasicFrame>
        <div className='flex justify-center items-center'>
          <h2 className='text-center font-dnf w-[200px] h-[60px] text-[36px] p-2 pt-[40px]'>
            회원가입
          </h2>
          <InfoHover />
        </div>
        {/* 입력창 */}
        <div className='flex justify-center items-center pt-[60px]'>
          <InputBox
            name={'user-id'}
            size={'small'}
            addStyle='m-2 inputBox-font-medium'
            type={'text'}
            placeholder={'아이디'}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className='flex justify-center items-center'>
          <InputBox
            name={'user-nickname'}
            size={'small'}
            addStyle='m-2 inputBox-font-medium'
            type={'text'}
            placeholder={'닉네임'}
            onChange={(e) => setUserNickname(e.target.value)}
          />
        </div>
        <div className='flex justify-center items-center'>
          <InputBox
            name={'user-password'}
            size={'small'}
            addStyle='m-2 inputBox-font-medium'
            type={'password'}
            placeholder={'비밀번호'}
            onChange={(e) => {
              setPassword(e.target.value);
              checkPasswordMatch();
            }}
          />
        </div>
        <div className='flex justify-center items-center'>
          <InputBox
            name={'check-user-password'}
            size={'small'}
            addStyle='m-2 inputBox-font-medium'
            type={'password'}
            placeholder={'비밀번호 확인'}
            onChange={(e) => {
              setPassword2(e.target.value);
              checkPasswordMatch();
            }}
          />
        </div>
        {/* 버튼창 */}
        <div className='flex justify-center items-center'>
          <Button
            text={'뒤로가기'}
            size={'small'}
            color={'gray'}
            onClick={() => navigate('/login')}
          />
          <Button
            text={'가입하기'}
            size={'small'}
            color={'green'}
            onClick={() => signUp(userid, usernickname, password)}
          />
        </div>
      </BasicFrame>
    </div>
  );
};

export default SignUpPage;
