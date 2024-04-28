import BasicFrame from '@/components/frame/basicFrame';
import InputBox from '@/components/inputbox';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/button';

const SignUpPage = () => {
  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();

  // 기타 조건 추가 등 수정 예정
  const signUp = (userid: string, password: string) => {
    if (isPasswordValid(password)) {
      console.log(
        'id = ' + userid + '  pw = ' + password + '\n 정상, API 연결 예정',
      );
    } else if (!isPasswordValid(password)) {
      console.log('비밀번호 조건을 다시 확인해주세요');
    }
  };

  const isPasswordValid = (password: string): boolean => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{15,}$/;

    return regex.test(password);
  };

  useEffect(() => {
    checkPasswordMatch();
  }, [password, password2]);

  const checkPasswordMatch = () => {
    setPasswordMatch(password === password2);
  };

  return (
    <div>
      <BasicFrame>
        <div className='flex justify-center items-center'>
          <h2 className='text-center font-dnf w-[200px] h-[60px] text-[36px] p-2 pt-[40px]'>
            회원가입
          </h2>
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
        {/* 비밀번호 일치 여부 및 안내메시지 */}
        <div className='flex justify-center items-center'>
          {(!password || !password2) && (
            <p className='font-neo' style={{ color: 'rgb(75 75 75)' }}>
              비밀번호는 대/소문자와 특수문자 포함 15자 이상
            </p>
          )}
          {password && password2 && !passwordMatch && (
            <p className='font-neo' style={{ color: 'rgb(239 68 68)' }}>
              비밀번호가 일치하지 않습니다.
            </p>
          )}
          {password && password2 && passwordMatch && (
            <p className='font-neo' style={{ color: 'rgb(21 128 61)' }}>
              비밀번호가 일치합니다.
            </p>
          )}
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
            onClick={() => signUp(userid, password)}
          />
        </div>
      </BasicFrame>
    </div>
  );
};

export default SignUpPage;
