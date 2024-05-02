import BasicFrame from '@/components/frame/basicFrame';
import * as constants from '@/pages/group/constants';
import InputBox from '@/components/inputbox';
import Button from '@/components/button';
import React, { useState } from 'react';
import SearchModal from '@/pages/group/makeGroup/SearchModal.tsx';
import { makeGroup } from '@/apis/group.ts';

interface MakeGroupProps {
  partyName: string;
  partyMessage: string;
  memberCount: number;
  partyManagerId: number;
}

const MakeGroupPage = () => {
  const [id] = useState<number>(0);
  const [loginId, setLoginId] = useState<string>('');
  const [partyName, setPartyName] = useState<string>('');
  const [partyMessage, setPartyMessage] = useState<string>('');
  const [memberCount, setMemberCount] = useState<number>(0);
  const [nicknames, setNicknames] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const changeLoginId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(event.target.value);
  };
  const changePartyName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartyName(event.target.value);
  };
  const changePartyMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartyMessage(event.target.value);
  };

  // 여기에 회원 검색이 들어갑니다. API를 통해서 memberID를 return 받도록 한다. 그 후 setId를 장착
  const handleSearchClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = (nicknameProps?: string) => {
    setModalOpen(false);
    if (nicknameProps && nicknames.length < 6) {
      setNicknames((prev) => [...prev, nicknameProps]); // 닉네임 배열에 추가
      setMemberCount(nicknames.length + 1);
    }
  };

  const clickMakeGroup = async ({
    partyName,
    partyMessage,
    memberCount,
    partyManagerId,
  }: MakeGroupProps) => {
    await makeGroup(partyName, partyMessage, memberCount, partyManagerId);
  };

  return (
    <BasicFrame>
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
          onClick={handleSearchClick}
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
        {modalOpen && <SearchModal onClose={handleCloseModal} memberId={id} />}
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
            <div className={'font-neo text-xl pt-1'}> 6명</div>
          </div>
          <div id='here'>
            {nicknames.map((name, index) => (
              <div key={index} className={'font-neo text-xl pt-1'}>
                {name}
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
          onClick={() =>
            clickMakeGroup({
              partyName: partyName,
              partyMessage: partyMessage,
              memberCount: memberCount,
              partyManagerId: 1, // partyManagerId는 예시 값
            })
          }
        />
      </div>
    </BasicFrame>
  );
};

export default MakeGroupPage;
