import MyFrame from '@/components/frame/myFrame';
import * as constants from '@/pages/cat/constants.ts';
import InputBox from '@/components/inputbox';
import Button from '@/components/button';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getMyInfo, patchMyInfo } from '@/apis/member.ts';
import { MyInfoProps } from '@/types/member';

const MyCatInfo = () => {
  const navigate = useNavigate();
  const [myInfo, setMyInfo] = useState<MyInfoProps>({
    memberExp: 0,
    memberCreatedAt: '',
    memberCatName: '',
    memberHitNumber: 0,
    memberBehitNumber: 0,
    level: 1,
    memberGoal: '',
    titleContent: '',
    catAssetUrl: '',
  });

  const handleGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newGoal = event.target.value;
    setMyInfo((prevInfo) => ({
      ...prevInfo,
      memberGoal: newGoal,
    }));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setMyInfo((prevInfo) => ({
      ...prevInfo,
      memberCatName: newName,
    }));
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTitle = event.target.value;
    setMyInfo((prevInfo) => ({
      ...prevInfo,
      titleContent: newTitle,
    }));
  };

  const updateMyInfo = async () => {
    try {
      const response = await patchMyInfo({
        memberCatName: myInfo.memberCatName,
        memberGoal: myInfo.memberGoal,
        titleId: 1,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const response = await getMyInfo();
        setMyInfo(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyInfo();
  }, []);

  return (
    <MyFrame>
      <div className={'pt-20'}>
        <div className={'font-dnf text-2xl pl-20'}>{constants.MY_GOAL}</div>
        <div className={'pl-20'}>
          <InputBox
            name={'나의 목표'}
            size={'setting'}
            type={'text'}
            value={myInfo.memberGoal}
            placeholder={''}
            onChange={handleGoalChange}
          />
          <Button
            text={'저장'}
            size={'small'}
            color={'blue'}
            onClick={() => updateMyInfo()}
          />
        </div>
      </div>
      <div className={'font-dnf text-2xl pl-20'}>{constants.CAT_NAME}</div>
      <div className={'pl-20'}>
        <InputBox
          name={'나의 이름'}
          size={'setting'}
          type={'text'}
          value={myInfo.memberCatName}
          placeholder={''}
          onChange={handleNameChange}
        />
        <Button
          text={'저장'}
          size={'small'}
          color={'blue'}
          onClick={() => updateMyInfo()}
        />
      </div>
      <div className={'font-dnf text-2xl pl-20'}>{constants.TITLE_NAME}</div>
      <div className={'pl-20'}>
        <select
          className={'w-60 h-10 rounded bg-frameColor font-neo pl-5 text-xl'}
          value={myInfo.titleContent}
          onChange={handleTitleChange}
        >
          <option value='none'>{myInfo.titleContent}</option>
        </select>
        <Button
          text={'저장'}
          size={'small'}
          color={'blue'}
          onClick={() => updateMyInfo()}
        />
      </div>
      <div className='flex justify-center'>
        <Button
          text={'뒤로'}
          size={'small'}
          color={'navy'}
          onClick={() => navigate(-1)}
        />
      </div>
    </MyFrame>
  );
};

export default MyCatInfo;
