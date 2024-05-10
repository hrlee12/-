import { useNavigate } from 'react-router-dom';
import '@/components/cat/idle/index.css';
import IdleCat from '@/components/cat/idle';
import { useSkinStore } from '@/stores/useSkinStore';
import { useAuthStore } from '@/stores/useAuthStore';

const Landing = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 라우팅 함수를 가져옵니다.

  const movePage = () => {
    const logInCheck = useAuthStore.getState().accessToken;
    if (logInCheck === null) {
      navigate('/login');
    } else {
      navigate('/group');
    }
  };

  return (
    <div className='h-[600px] flex justify-end items-end'>
      <IdleCat
        catId={useSkinStore.getState().skinId}
        onClick={() => {
          movePage();
        }}
      />
    </div>
  );
};

export default Landing;
