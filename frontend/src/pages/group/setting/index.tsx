import * as constants from '@/pages/group/constants.ts';
import BasicFrame from '@/components/frame/basicFrame';
import InputBox from '@/components/inputbox';
import Button from '@/components/button';
import { deleteGroup, groupDetail, updateGroup } from '@/apis/group.ts';
import { useEffect, useState } from 'react';

interface GroupProps {
  partyId: number;
}

const GroupSetting = ({ partyId }: GroupProps) => {
  const [groupSettings, setGroupSettings] = useState<string[]>([]);
  const [partyName, setPartyName] = useState<string>('');
  const [partyGoal, setPartyGoal] = useState<string>('');
  const [partyManagerId, setPartyManagerId] = useState<number>(0);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

  useEffect(() => {
    const getGroupSettings = async () => {
      try {
        const data = await groupDetail(partyId);
        setGroupSettings(data);
      } catch (err) {
        console.error(err);
      }
    };

    getGroupSettings();
  }, [refreshFlag, partyId]);

  const changeGroupSettings = async ({
    partyName: partyName,
    partyGoal: partyGoal,
    partyManagerId: partyManagerId,
  }: {
    partyName: string;
    partyGoal: string;
    partyManagerId: number;
  }) => {
    try {
      await updateGroup(partyId, partyName, partyGoal, partyManagerId);
    } catch (err) {
      console.error(err);
    }
  };
  const clickDeleteGroup = async () => {
    await deleteGroup();
  };

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
          // value={groupSettings.partyName}
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
          // value={groupSettings.partyGoal}
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
        onClick={clickDeleteGroup}
      />
    </BasicFrame>
  );
};

export default GroupSetting;
