import { useNavigate } from 'react-router-dom';

import InputBox from '../../components/inputbox';
import BasicFrame from '@/components/frame/basicFrame';

const Landing = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 라우팅 함수를 가져옵니다.

  return (
    <div>
      여기 main 맞나요?
      <button onClick={() => navigate('/cat')}>Cat 컴포넌트 보기</button>
      <BasicFrame>
        <div className='flex flex-col'>
          <InputBox
            name={'이것'}
            size={'small'}
            addStyle='m-4'
            type={'text'}
            placeholder={'기본 inputBox'}
            onChange={() => {}}
          />
          <InputBox
            name={'이것'}
            size={'medium'}
            type={'text'}
            addStyle='m-4'
            placeholder={'로그인'}
            onChange={() => {}}
          />
          <InputBox
            name={'이것'}
            addStyle={'text-2xl'}
            size={'large'}
            type={'text'}
            placeholder={'채팅'}
            onChange={() => {}}
          />
        </div>
      </BasicFrame>
    </div>
  );
};

export default Landing;
