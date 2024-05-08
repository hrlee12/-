import MyFrame from '@/components/frame/myFrame';
import * as constants from '@/pages/cat/constants.ts';

import Button from '@/components/button';
import Pomodoro from '@/components/timer/pomodoro';
import { useNavigate } from 'react-router-dom';
import { useSkinStateStore } from '@/stores/useSkinStore.ts';

const MyCatSetting = () => {
  const navigate = useNavigate();
  const mySkin = useSkinStateStore.getState().skinUrl;

  return (
    <MyFrame>
      <div className={'pt-10'}>
        <div className={'flex flex-row justify-center'}>
          <div
            className='character-idle'
            id='clickable-area'
            style={{ backgroundImage: `url('${mySkin}')` }}
            onClick={() => navigate('/catSkin')}
          >
            {' '}
          </div>
        </div>
      </div>
      <div className='flex flex-col font-dnf text-2xl pl-20'>
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
