import { useNavigate } from 'react-router-dom';
// import Button from '@/components/button';
import '@/components/cat/idle/index.css';
import { useSkinStateStore } from '@/stores/useSkinStore.ts';

const Landing = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 라우팅 함수를 가져옵니다.
  const mySkin = useSkinStateStore.getState().skinUrl;

  return (
    <div className='h-[600px] flex justify-end items-end'>
      <div
        className='character-idle'
        id='clickable-area'
        style={{ backgroundImage: `url('${mySkin}')` }}
        onClick={() => navigate('/login')}
      ></div>
    </div>
  );
};

export default Landing;
