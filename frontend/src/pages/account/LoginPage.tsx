import Button from '@/components/button';
import BasicFrame from '@/components/frame/basicFrame';
import InputBox from '@/components/inputbox';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logIn } from '@/apis/user.ts';
import { FaCircleXmark } from 'react-icons/fa6';
import CrouchCat from '@/components/cat/crouch';
import { getMyInfo } from '@/apis/member.ts';
import { useSkinStore } from '@/stores/useSkinStore.ts';

const LoginPage = () => {
  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isPassed, setIsPassed] = useState(true);

  const navigate = useNavigate();

  const loginClick = async () => {
    const id: string = userid;
    const pw: string = password;
    const response = await logIn(id, pw);
    if (response?.status == 200) {
      const response = await getMyInfo();
      useSkinStore.getState().setSkinId(response.catId);
      navigate('/group');
    }
    setIsPassed(false);
  };

  return (
    <div>
      <BasicFrame>
        <FaCircleXmark
          className='absolute left-0 mt-[0px] text-[35px] text-inputBoxColor bg-frameColor rounded-boxRadius'
          onClick={() => navigate('/')}
        />
        <div className='flex justify-center items-center'>
          <h2 className='text-center font-dnf w-[200px] h-[60px] text-[36px] p-2 pt-[40px]'>
            모각냥
            <div className='text-[18px] text'>모두 각자 냥이</div>
          </h2>
          <CrouchCat
            catId={1}
            addStyle={{
              left: 60,
              top: 80,
              width: 150,
              height: 150,
            }}
          />
          <CrouchCat
            catId={2}
            addStyle={{ left: 100, top: 80, width: 150, height: 150 }}
          />
          <CrouchCat
            catId={3}
            addStyle={{ left: 140, top: 80, width: 150, height: 150 }}
          />
          <CrouchCat
            catId={4}
            addStyle={{ left: 180, top: 80, width: 150, height: 150 }}
          />
          <CrouchCat
            catId={5}
            addStyle={{ left: 220, top: 80, width: 150, height: 150 }}
          />
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
              type={'password'}
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
          {!isPassed && (
            <div className='font-dnf flex justify-center items-center pt-[20px]'>
              아이디 혹은 비밀번호를 다시 확인해주세요
            </div>
          )}
        </div>
      </BasicFrame>
    </div>
  );
};

export default LoginPage;
