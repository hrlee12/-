import { useNavigate } from 'react-router-dom';
import '@/components/cat/idle/index.css';
import IdleCat from '@/components/cat/idle';
import { useSkinStore } from '@/stores/useSkinStore';

const Landing = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 라우팅 함수를 가져옵니다.

  return (
    <div className='h-[600px] flex justify-end items-end'>
      <IdleCat
        catId={useSkinStore.getState().skinId}
        onClick={() => {
          navigate('/login');
        }}
      />
    </div>
  );
};

export default Landing;
