import MyFrame from '@/components/frame/myFrame';
import * as constants from '@/pages/cat/constants.ts';
import InputBox from '@/components/inputbox';
import Button from '@/components/button';
import { useNavigate } from 'react-router-dom';

const MyCatInfo = () => {
  const navigate = useNavigate();

  return (
    <MyFrame>
      <div className={'pt-32'}>
        <div className={'font-dnf text-2xl pl-20'}>{constants.CAT_NAME}</div>
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
      <div className={'pt-3'}>
        <div className={'font-dnf text-2xl pl-20'}>{constants.TITLE_NAME}</div>
        <div className={'pl-20'}>
          <select className={'w-60 h-10 rounded bg-frameColor'}></select>
          <Button
            text={'저장'}
            size={'small'}
            color={'blue'}
            onClick={() => {}}
          />
        </div>
        <div className={'pt-5 flex flex-row justify-center'}>
          <Button
            text={'뒤로'}
            size={'small'}
            color={'gray'}
            onClick={() => navigate(-1)}
          />
          <Button
            text={'로그아웃'}
            size={'small'}
            color={'gray'}
            onClick={() => {}}
          />
        </div>
      </div>
    </MyFrame>
  );
};

export default MyCatInfo;
