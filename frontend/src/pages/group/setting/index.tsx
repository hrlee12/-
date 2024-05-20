import React, { useEffect, useState } from 'react';
import * as constants from '@/pages/group/constants.ts';
import { useNavigate, useParams } from 'react-router-dom';
import BasicFrame from '@/components/frame/basicFrame';
import InputBox from '@/components/inputbox';
import Button from '@/components/button';
import {
  deleteGroup,
  groupDetail,
  leaveGroup,
  updateGroup,
} from '@/apis/group.ts';
import { GroupProps, UpdateGroupInfo } from '@/types/group';
import { useAuthStore } from '@/stores/useAuthStore.ts';

const GroupSetting = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const partyId = Number(groupId);
  const myId = useAuthStore.getState().accessToken;

  const [groupDetails, setGroupDetails] = useState<GroupProps>({
    partyId: partyId,
    partyName: '',
    partyGoal: '',
    partyManagerId: 0,
    memberCatName: '',
    partyManagerName: '',
    partyMembers: [],
  });

  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const detailData = await groupDetail(partyId);
        setGroupDetails(detailData);
      } catch (err) {
        console.error(err);
      }
    };

    console.log(myId);
    fetchDetails();
  }, [refreshFlag]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setGroupDetails((prev) => ({
      ...prev,
      [name]: name === 'partyManagerId' ? parseInt(value, 10) : value,
    }));
  };

  const renderSaveButton = () => (
    <Button
      text={'저장'}
      size={'small'}
      color={'blue'}
      onClick={changeGroupDetails}
    />
  );

  const changeGroupDetails = async () => {
    try {
      const { partyName, partyGoal, partyManagerId } = groupDetails;
      const updateInfo: UpdateGroupInfo = {
        partyId: partyId,
        partyName,
        partyGoal,
        partyManagerId,
      };
      await updateGroup(updateInfo);
      setRefreshFlag(!refreshFlag);
      navigate('/group');
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

  const handleOutGroup = async () => {
    try {
      await leaveGroup(partyId);
      navigate('/group');
    } catch (err) {
      console.log(err);
    }
  };

  const renderActionButton = () => {
    if (myId === groupDetails.partyManagerId) {
      return (
        <Button
          text={'그룹 삭제'}
          addStyle={`fixed left-[275px] top-5`}
          size={'small'}
          color={'gray'}
          onClick={handleDeleteGroup}
        />
      );
    } else {
      return (
        <Button
          text={'그룹 탈퇴'}
          addStyle={`fixed left-[275px] top-5`}
          size={'small'}
          color={'gray'}
          onClick={handleOutGroup}
        />
      );
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
            className={'font-neo text-2xl pl-2 w-60 h-10 rounded bg-groupColor'}
            name='partyManagerId'
            value={groupDetails.partyManagerId}
            onChange={handleChange}
            disabled={myId !== groupDetails.partyManagerId}
          >
            {groupDetails.partyMembers.map((member, index) => (
              <option key={index} value={member.memberId}>
                {member.memberCatName}
              </option>
            ))}
          </select>
          {renderSaveButton()}
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
          addStyle={'text-xl'}
        />
        {renderSaveButton()}
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
          addStyle={'text-xl'}
        />
        {renderSaveButton()}
      </div>
      {renderActionButton()}
    </BasicFrame>
  );
};

export default GroupSetting;
