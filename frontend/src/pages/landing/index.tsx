import { useNavigate } from 'react-router-dom';
import Button from '@/components/button';
import SmallFrame from '@/components/frame/smallFrame';
import NyanPunch from '@/components/cat/nyanPunch';

const Landing = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 라우팅 함수를 가져옵니다.

  return (
    <SmallFrame>
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
      <NyanPunch />
    </SmallFrame>
  );
};

export default Landing;
