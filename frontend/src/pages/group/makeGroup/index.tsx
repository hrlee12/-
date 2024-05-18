import React, { useState } from 'react';

import * as constants from '@/pages/group/constants';
import { makeGroup } from '@/apis/group.ts';

import BasicFrame from '@/components/frame/basicFrame';
import InputBox from '@/components/inputbox';
import Button from '@/components/button';
import SearchModal from '@/pages/group/makeGroup/SearchModal.tsx';
import { getSearchFriend } from '@/apis/member.ts';
import { useNavigate } from 'react-router-dom';
import { FaCircleChevronLeft } from 'react-icons/fa6';

interface Member {
  memberLoginId: string;
}

const MakeGroupPage = () => {
  const [id, setId] = useState<number>(0);
  const [loginId, setLoginId] = useState<string>('');
  const [partyName, setPartyName] = useState<string>('');
  const [partyMessage, setPartyMessage] = useState<string>('');
  const [memberCount, setMemberCount] = useState<number>(0);
  const [partyMembers, setPartyMembers] = useState<Member[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const changeLoginId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(event.target.value);
  };
  const changePartyMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartyMessage(event.target.value);
  };
  const changePartyName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartyName(event.target.value);
  };

  const handleSearchClick = async (loginId: string) => {
    const response = await getSearchFriend(loginId);
    setId(response.memberId);
    setModalOpen(true);
  };

  const addPartyMember = (memberLoginId: string) => {
    setPartyMembers((prev) => {
      const newMembers = [...prev, { memberLoginId }];
      setMemberCount(newMembers.length);
      return newMembers;
    });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const clickMakeGroup = async () => {
    const groupInfo = {
      partyName: partyName,
      partyInviteMessage: partyMessage,
      partyParticipateNumber: memberCount,
      partyMembers: partyMembers,
    };
    try {
      await makeGroup(groupInfo);
      navigate('/group');
    } catch (error) {
      console.error('그룹 생성 실패', error);
    }
  };

  return (
    <>
      <BasicFrame>
        <FaCircleChevronLeft
          className='absolute mt-[0px] text-[35px] text-inputBoxColor bg-frameColor rounded-boxRadius'
          onClick={() => navigate('/group')}
        />
        <div className='pt-8 pl-9'>
          <div className='font-dnf text-4xl pb-8'>{constants.MAKE_GROUP}</div>
        </div>
        <div className={'pl-9'}>
          <InputBox
            name={'멤버 초대'}
            size={'setting'}
            type={'text'}
            value={loginId}
            placeholder={'친구 ID 입력'}
            onChange={changeLoginId}
          />
          <Button
            text={'검색'}
            size={'small'}
            color={'blue'}
            onClick={() => handleSearchClick(loginId)}
            disabled={partyMembers.length >= 5}
          />
        </div>
        <div className={'py-3 pl-9'}>
          <InputBox
            name={'초대 메세지'}
            size={'large'}
            type={'text'}
            value={partyMessage}
            placeholder={'초대 메세지'}
            onChange={changePartyMessage}
          />
          {modalOpen && (
            <SearchModal
              onClose={handleCloseModal}
              id={id}
              loginId={loginId}
              addMember={addPartyMember}
            />
          )}
        </div>
        <div className={'flex justify-center'}>
          <div className={'bg-groupColor rounded-boxRadius w-80 h-48'}>
            <div className={'flex flex-row'}>
              <div className={'font-neo text-xl pt-5 pl-5 pr-2'}>
                {constants.GROUP_SETTING.GROUP_NAME}
              </div>
              <div className='pt-4'>
                <InputBox
                  name={'그룹 이름 입력'}
                  size={'makeGroupName'}
                  type={'text'}
                  value={partyName}
                  placeholder={''}
                  onChange={changePartyName}
                />
              </div>
            </div>
            <div className={'flex flex-row'}>
              <div className={'font-neo text-xl pt-1 pl-5'}>
                {constants.GROUP_SETTING.GROUP_MEMBER}
              </div>
              <div className={'font-neo text-xl pl-3 pt-1'}>{memberCount}</div>
              <div className={'font-dnf text-xl pt-1'}>/</div>
              <div className={'font-neo text-xl pt-1'}> 5명</div>
            </div>
            <div className={'pl-5 grid grid-cols-2 grid-rows-3 gap-1'}>
              {partyMembers.map((member) => (
                <div
                  key={member.memberLoginId}
                  className={'font-neo text-xl pt-1'}
                >
                  {member.memberLoginId}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='pt-3 flex justify-center'>
          <Button
            text={'만들기'}
            size={'small'}
            color={'blue'}
            onClick={() => clickMakeGroup()}
          />
        </div>
      </BasicFrame>
    </>
  );
};

export default MakeGroupPage;
