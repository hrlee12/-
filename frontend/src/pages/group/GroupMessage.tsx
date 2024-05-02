import Button from '@/components/button';
import { acceptInvite, rejectInvite } from '@/apis/group.ts';

interface MessageProps {
  // 메세지 타입 확인
  messages: string[];
  onClose: () => void;
}

const GroupMessage = ({ messages, onClose }: MessageProps) => {
  const clickInvite = async (partyId: number) => {
    await acceptInvite(partyId);
  };

  const clickReject = async (partyId: number) => {
    await rejectInvite(partyId);
  };

  return (
    <div className='fixed right-24 bg-groupColor rounded-lg w-96 h-64 flex justify-center items-center'>
      <div className='bg-white p-5 rounded-lg'>
        <h2 className={'font-neo'}>메시지 목록</h2>
        <ul>
          {/*{messages.length > 0 ? (*/}
          {/*  messages.map((message, index) => <li key={index}>{message}</li>)*/}
          {/*) : (*/}
          <li className={'font-neo'}>메시지가 없습니다.</li>
          <Button
            text={'수락'}
            size={'small'}
            color={'green'}
            onClick={() => clickInvite(0)}
          />
          <Button
            text={'거절'}
            size={'small'}
            color={'red'}
            onClick={() => clickReject(0)}
          />
          {/*)}*/}
        </ul>
        <div className='flex justify-between mt-3'>
          <Button
            text={'닫기'}
            size={'small'}
            color={'navy'}
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupMessage;
