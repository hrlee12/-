import BasicFrame from '@/components/frame/basicFrame';
import InputBox from '@/components/inputbox';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/button';
import InfoHover from '@/pages/account/info/InfoHover.tsx';
import SignupSuccess from '@/pages/account/SuccessPage.tsx';
import { signUp } from '@/apis/user.ts';

const SignUpPage = () => {
  const [userid, setUserId] = useState('');
  const [usernickname, setUserNickname] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isPassed1, setIsPassed1] = useState(true);
  const [isPassed2, setIsPassed2] = useState(true);
  const [isDone, setIsDone] = useState(false);

  const navigate = useNavigate();

  const doSignUp = async (
    userid: string,
    usernickname: string,
    password: string,
  ) => {
    if (
      userid &&
      usernickname &&
      password &&
      isPasswordValid(password) &&
      passwordMatch
    ) {
      const response = await signUp(userid, usernickname, password);
      console.log(response);
      if (response?.status == 200) {
        setIsDone(true);
      } else {
        setIsPassed2(false);
      }
    } else {
      setIsPassed1(false);
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
    setIsPassed1(true);
  }, [checkPasswordMatch]);

  return (
    <div>
      <BasicFrame>
        <div className='flex justify-center items-center'>
          <h2 className='text-center font-dnf w-[200px] h-[60px] text-[36px] p-2 pt-[40px]'>
            회원가입
          </h2>
          <div className='absolute pl-[345px] pt-[85px] w-full'>
            <InfoHover />
          </div>
        </div>
        {isDone && (
          <div className='font-dnf flex justify-center items-center pt-[4px]'>
            <SignupSuccess />
          </div>
        )}
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
            onClick={() => doSignUp(userid, usernickname, password)}
          />
        </div>
        {!isPassed1 && (
          <div className='font-dnf flex justify-center items-center pt-[4px]'>
            빈칸 혹은 비밀번호를 다시 확인해주세요
          </div>
        )}
        {!isPassed2 && (
          <div className='font-dnf flex justify-center items-center pt-[4px]'>
            중복된 아이디가 있습니다.
          </div>
        )}
      </BasicFrame>
    </div>
  );
};

export default SignUpPage;
