import MyFrame from '@/components/frame/myFrame';
import * as constants from '@/pages/cat/constants.ts';

import { FaGear } from 'react-icons/fa6';
import Button from '@/components/button';
import Pomodoro from '@/components/timer/pomodoro';
import { useNavigate } from 'react-router-dom';

const MyCatSetting = () => {
  const navigate = useNavigate();

  return (
    <MyFrame>
      <div className={'pt-20'}>
        <div className={'flex flex-row justify-center'}>
          <div>여기에 고양이</div>
          <FaGear size={24} onClick={() => navigate('/catInfo')} />
        </div>
      </div>
      <div className='flex flex-col font-dnf text-2xl pl-20 py-5'>
        {constants.POMODORO}
      </div>
      <Pomodoro />
      <div className={'flex justify-center pt-5'}>
        <Button
          text={'냥 정보'}
          size={'small'}
          color={'green'}
          onClick={() => navigate('/catInfo')}
        />
        <Button
          text={'로그아웃'}
          size={'small'}
          color={'gray'}
          onClick={() => {}}
        />
      </div>
    </MyFrame>
  );
};

export default MyCatSetting;
