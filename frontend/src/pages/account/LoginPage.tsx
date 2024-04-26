import Button from '@/components/button';
import BasicFrame from '@/components/frame/basicFrame';
import InputBox from '@/components/inputbox';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const loginClick = () => {
    const id: string = userid;
    const pw: string = password;
    console.log('아이디 입력은 -> ' + id);
    console.log('비밀번호 입력은 -> ' + pw);
  };

  return (
    <div>
      <BasicFrame>
        <div className='flex justify-center items-center'>
          <h2 className='text-center font-dnf w-[200px] h-[60px] text-[36px] p-2 pt-[40px]'>
            모각냥
            <div className='text-[18px] text'>모두 각자 냥이</div>
          </h2>
        </div>
        <div className='pt-[160px]'>
          {/* 입력창 */}
          <div className='flex justify-center items-center'>
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
              type={'text'}
              placeholder={'비밀번호'}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* 버튼창 */}
          <div className='flex justify-center items-center'>
            <Button
              text={'로그인'}
              size={'small'}
              color={'green'}
              onClick={loginClick}
            />
            <Button
              text={'회원가입'}
              size={'small'}
              color={'green'}
              onClick={() => navigate('/signup')}
            />
          </div>
        </div>
      </BasicFrame>
    </div>
  );
};

export default LoginPage;
