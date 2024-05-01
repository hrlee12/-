import Button from '@/components/button';

import * as constants from '@/pages/group/constants';
import { inviteMember } from '@/apis/group.ts';

interface ModalProps {
  memberId: number;
  onClose: (nickName?: string) => void; // 그냥 닫기 버튼 누를 수도 있어서 ?로 지정
}

const SearchModal = ({ memberId, onClose }: ModalProps) => {
  const inviteClick = async () => {
    const response = await inviteMember(memberId);
    const nickName = response.nickname; // 여기 확인
    onClose(nickName);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div
        className='bg-groupColor rounded-lg p-8 flex flex-col justify-center items-center'
        onClick={(e) => e.stopPropagation()}
      >
        <div className={'font-dnf text-4xl p-5'}>@{memberId}</div>
        <div className='font-dnf text-2xl'>
          {constants.GROUP_INVITE_MESSAGE}
        </div>
        <div>
          <Button
            text={'닫기'}
            size={'small'}
            color={'navy'}
            onClick={onClose}
          />
          <Button
            text={'초대'}
            size={'small'}
            color={'blue'}
            onClick={inviteClick}
          />
        </div>
      </div>
    </div>
  );
};
export default SearchModal;
