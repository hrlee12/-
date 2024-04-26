import BasicFrame from '@/components/frame/basicFrame';
import InputBox from '@/components/inputbox';
import { useState } from 'react';

const SignUpPage = () => {
  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  return (
    <div>
      <BasicFrame>
        <div className='flex justify-center items-center'>
          <h2 className='text-center font-dnf w-[200px] h-[60px] text-[36px] p-2 pt-[40px]'>
            회원가입
          </h2>
        </div>
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
            type={'password'}
            placeholder={'비밀번호'}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='flex justify-center items-center'>
          <InputBox
            name={'user-password'}
            size={'small'}
            addStyle='m-2 inputBox-font-medium'
            type={'password'}
            placeholder={'비밀번호 확인'}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <div className=''>back</div>
      </BasicFrame>
    </div>
  );
};

export default SignUpPage;
