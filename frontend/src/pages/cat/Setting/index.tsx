import MyFrame from '@/components/frame/myFrame';
import * as constants from '@/pages/cat/constants.ts';

import Button from '@/components/button';
import Pomodoro from '@/components/timer/pomodoro';
import { useNavigate } from 'react-router-dom';
import { useSkinStore } from '@/stores/useSkinStore.ts';
import { logOut } from '@/apis/user';

const MyCatSetting = () => {
  const navigate = useNavigate();
  const mySkin = useSkinStore.getState().skinId;

  const logOutClick = async () => {
    const response = await logOut();
    if (response?.status == 200) {
      navigate('/');
    }
  };

  return (
    <MyFrame>
      <div className={'pt-10'}>
        <div className={'flex flex-row justify-center'}>
          <div
            className='character-idle'
            id='clickable-area'
            style={{
              backgroundImage: `url(${import.meta.env.VITE_IMG_URL}/cat_idle_0${mySkin}.png)`,
            }}
            onClick={() => navigate('/catSkin')}
          ></div>
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
          onClick={() => {
            logOutClick();
          }}
        />
      </div>
    </MyFrame>
  );
};

export default MyCatSetting;
