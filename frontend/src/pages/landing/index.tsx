import { useNavigate } from 'react-router-dom';
// import Button from '@/components/button';
import '@/components/cat/idle/index.css';
import IdleCat from '@/components/cat';

const Landing = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 라우팅 함수를 가져옵니다.

  return (
    <div className='h-[600px] flex justify-end items-end'>
      <IdleCat
        catId={1}
        onClick={() => {
          navigate('/login');
        }}
      />
    </div>
  );
};

export default Landing;
