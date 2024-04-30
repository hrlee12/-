import Button from '@/components/button';

import * as constants from '@/pages/group/constants';

interface ModalProps {
  memberId: string;
  onClose: () => void;
}

const SearchModal = ({ memberId, onClose }: ModalProps) => {
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
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
export default SearchModal;
