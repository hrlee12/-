import Button from '@/components/button';
import { useNavigate } from 'react-router-dom';
import '@/pages/account/info/HoverPopup.css';

const SignupSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className='success-page text-center mt-[300px]'>
      <h1 className='mt-[60px]'>회원가입을 축하합니다!</h1>
      <p>회원가입이 성공적으로 완료되었습니다.</p>
      <Button
        color='blue'
        size='admin'
        text='로그인!'
        onClick={() => navigate('/login')}
      />
    </div>
  );
};

export default SignupSuccess;
