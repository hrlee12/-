import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 라우팅 함수를 가져옵니다.

  return (
    <div>
      여기 main 맞나요?
      <button onClick={() => navigate('/cat')}>Cat 컴포넌트 보기</button>
    </div>
  );
};

export default Landing;
