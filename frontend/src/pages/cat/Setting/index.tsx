import MyFrame from '@/components/frame/myFrame';
import * as constants from '@/pages/cat/constants.ts';

import { FaInfo } from 'react-icons/fa6';
import { FaGear } from 'react-icons/fa6';
import InputBox from '@/components/inputbox';
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
          <FaInfo size={24} onClick={() => navigate('/cat')} />
          <FaGear size={24} onClick={() => navigate('/catInfo')} />
        </div>
      </div>
      <div className={'pt-3'}>
        <div className={'font-dnf text-2xl pl-20'}>{constants.MY_GOAL}</div>
        <div className={'pl-20'}>
          <InputBox
            name={'나의 목표'}
            size={'setting'}
            type={'text'}
            placeholder={''}
            onChange={() => {}}
          />
          <Button
            text={'저장'}
            size={'small'}
            color={'blue'}
            onClick={() => {}}
          />
        </div>
      </div>
      <div className='flex flex-col font-dnf text-2xl pl-20 py-2'>
        {constants.POMODORO}
      </div>
      <Pomodoro />
      <div className={'flex justify-center'}>
        <Button
          text={'냥 정보'}
          size={'small'}
          color={'green'}
          onClick={() => {}}
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
