import React, { useEffect, useState } from 'react';

import * as constants from '@/pages/group/constants.ts';
import BasicFrame from '@/components/frame/basicFrame';
import InputBox from '@/components/inputbox';
import Button from '@/components/button';
import {
  deleteGroup,
  getMembers,
  groupDetail,
  updateGroup,
} from '@/apis/group.ts';
import { useNavigate } from 'react-router-dom';

interface GroupProps {
  partyId: number;
  partyName: string;
  partyGoal: string;
  partyManagerId: number;
}

const GroupSetting = () => {
  const navigate = useNavigate();
  const [groupDetails, setGroupDetails] = useState<GroupProps>({
    partyId: 0,
    partyName: '',
    partyGoal: '',
    partyManagerId: 0,
  });
  const [members, setMembers] = useState<string[]>([]);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const detailData = await groupDetail(groupDetails.partyId);
        const memberData = await getMembers(groupDetails.partyId);
        setGroupDetails((prev) => ({ ...prev, ...detailData }));
        setMembers(memberData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetails();
  }, [refreshFlag, groupDetails.partyId]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setGroupDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeGroupDetails = async () => {
    try {
      await updateGroup(
        groupDetails.partyId,
        groupDetails.partyName,
        groupDetails.partyGoal,
        groupDetails.partyManagerId,
      );
      setRefreshFlag(!refreshFlag);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      await deleteGroup();
      navigate('/group');
    } catch (err) {
      console.error(err);
    }
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
          <select
            className={'w-60 h-10 rounded bg-groupColor'}
            name='partyManagerId'
            value={groupDetails.partyManagerId}
            onChange={handleChange}
          >
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
          <Button
            text={'저장'}
            size={'small'}
            color={'blue'}
            onClick={changeGroupDetails}
          />
        </div>
      </div>
      <div className='font-dnf text-2xl pl-9 pt-1'>
        {constants.GROUP_SETTING.GROUP_NAME}
      </div>
      <div className={'pl-9'}>
        <InputBox
          name='partyName'
          size={'setting'}
          type={'text'}
          value={groupDetails.partyName}
          placeholder={''}
          onChange={handleChange}
        />
        <Button
          text={'저장'}
          size={'small'}
          color={'blue'}
          onClick={changeGroupDetails}
        />
      </div>
      <div className={'pl-9 pt-3'}>
        <div className='font-dnf text-2xl'>
          {constants.GROUP_SETTING.GROUP_GOAL}
        </div>
        <InputBox
          name='partyGoal'
          size={'setting'}
          type={'text'}
          value={groupDetails.partyGoal}
          placeholder={''}
          onChange={handleChange}
        />
        <Button
          text={'저장'}
          size={'small'}
          color={'blue'}
          onClick={changeGroupDetails}
        />
      </div>
      <Button
        text={'그룹 삭제'}
        addStyle={`fixed left-[275px] top-5`}
        size={'small'}
        color={'gray'}
        onClick={handleDeleteGroup}
      />
    </BasicFrame>
  );
};

export default GroupSetting;
