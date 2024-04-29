import * as constants from '@/pages/group/constants.ts';
import BasicFrame from '@/components/frame/basicFrame';
import InputBox from '@/components/inputbox';
import Button from '@/components/button';

const GroupSetting = () => {
  return (
    <BasicFrame>
      <div className='pt-8 pl-9'>
        <div className='font-dnf text-4xl pb-8'>
          {constants.GROUP_SETTING.TITLE}
        </div>
      </div>
      <div>
        <div className='font-dnf text-2xl pl-9'>
          {constants.GROUP_SETTING.CHANGE_MASTER}
        </div>
        <div className={'pl-9'}>
          <select className={'w-60 h-10 rounded bg-groupColor'}></select>
          <Button
            text={'저장'}
            size={'small'}
            color={'blue'}
            onClick={() => {}}
          />
        </div>
      </div>
      <div className='font-dnf text-2xl pl-9 pt-1'>
        {constants.GROUP_SETTING.GROUP_NAME}
      </div>
      <div className={'pl-9'}>
        <InputBox
          name={'그룹 이름'}
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
      <div className={'pl-9 pt-3'}>
        <div className='font-dnf text-2xl'>
          {constants.GROUP_SETTING.GROUP_GOAL}
        </div>
        <InputBox
          name={'그룹 목표'}
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
      <Button
        text={'그룹 삭제'}
        addStyle={`fixed left-[275px] top-5`}
        size={'small'}
        color={'gray'}
        onClick={() => {}}
      />
    </BasicFrame>
  );
};

export default GroupSetting;
