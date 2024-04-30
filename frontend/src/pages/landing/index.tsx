import { useNavigate } from 'react-router-dom';
import Button from '@/components/button';

const Landing = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 라우팅 함수를 가져옵니다.

  return (
    <div>
      <Button
        text={'그룹 정보'}
        size={'admin'}
        color={'blue'}
        onClick={() => navigate('/groupInfo')}
      />
      <Button
        text={'예시'}
        size={'admin'}
        color={'navy'}
        onClick={() => navigate('/catSetting')}
      />
      <Button
        text={'웹알티씨'}
        size={'admin'}
        color={'navy'}
        onClick={() => navigate('/screenshare')}
      />
    </div>
  );
};

export default Landing;
