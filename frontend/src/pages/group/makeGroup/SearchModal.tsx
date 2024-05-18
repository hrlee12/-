import Button from '@/components/button';

import * as constants from '@/pages/group/constants';

interface ModalProps {
  id: number;
  loginId: string;
  onClose: () => void;
  addMember: (loginId: string) => void;
}

const SearchModal = ({ loginId, onClose, addMember }: ModalProps) => {
  const handleAddClick = () => {
    addMember(loginId);
    onClose();
  };

  return (
    <div className='fixed left-[880px] top-[280px] inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-groupColor rounded-lg p-8 flex flex-col justify-center items-center'>
        <div className={'font-dnf text-4xl p-5'}>@{loginId}</div>
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
            text={'추가'}
            size={'small'}
            color={'blue'}
            onClick={handleAddClick}
          />
        </div>
      </div>
    </div>
  );
};
export default SearchModal;
