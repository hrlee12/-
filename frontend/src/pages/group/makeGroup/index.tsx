import BasicFrame from '@/components/frame/basicFrame';
import * as constants from '@/pages/group/constants';
import InputBox from '@/components/inputbox';
import Button from '@/components/button';
import { useState } from 'react';
import SearchModal from '@/pages/group/makeGroup/SearchModal.tsx';

const MakeGroupPage = () => {
  const [id, setId] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleSearchClick = () => {
    setModalOpen(true);
  };

  const handleChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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
          value={id}
          placeholder={'친구 ID 입력'}
          onChange={handleChangeId}
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
          placeholder={'초대 메세지'}
          onChange={() => {}}
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
                placeholder={''}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className={'font-neo text-xl pt-1 pl-5'}>
            {constants.GROUP_SETTING.GROUP_MEMBER}
          </div>
        </div>
      </div>
      <div className='pt-3 flex justify-center'>
        <Button
          text={'만들기'}
          size={'small'}
          color={'blue'}
          onClick={() => {}}
        />
      </div>
    </BasicFrame>
  );
};

export default MakeGroupPage;
