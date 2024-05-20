import { useState } from 'react';
import Button from '@/components/button';
import { acceptInvite, rejectInvite } from '@/apis/group';
import { InviteMessage } from '@/types/group';
import * as constants from '@/pages/group/constants';

interface MessageProps {
  messages: InviteMessage[];
  onClose: () => void;
}

const GroupMessage = ({ messages: initialMessages, onClose }: MessageProps) => {
  const [messages, setMessages] = useState<InviteMessage[]>(initialMessages); // 상태 관리

  const clickInvite = async (partyId: number, index: number) => {
    await acceptInvite(partyId);
    console.log(partyId);
    removeMessage(index);
  };

  const clickReject = async (partyId: number, index: number) => {
    await rejectInvite(partyId);
    removeMessage(index);
  };

  const removeMessage = (index: number) => {
    setMessages((currentMessages) =>
      currentMessages.filter((_, idx) => idx !== index),
    );
  };

  return (
    <div className='fixed right-24 bg-groupColor rounded-lg w-96 h-64 flex justify-center items-center border-spacing-1'>
      <div className='bg-white p-5 rounded-lg'>
        <h2 className={'font-neo '}>{constants.GROUP_MEESAGE.LIST}</h2>
        <ul
          style={{
            maxHeight: '150px',
            overflowY: 'scroll',
          }}
        >
          <style>{` ul::-webkit-scrollbar {display: none;}`}</style>
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <li
                key={index}
                className={'font-neo'}
                style={{ border: '1px solid black' }}
              >
                {`초대한 사람: ${message.memberName} 초대 그룹: ${message.partyName}`}
                <div className={'flex justify-center'}>
                  <Button
                    text={'수락'}
                    size={'alarm'}
                    color={'blue'}
                    onClick={() => clickInvite(message.partyId, index)}
                  />
                  <Button
                    text={'거절'}
                    size={'alarm'}
                    color={'red'}
                    onClick={() => clickReject(message.partyId, index)}
                  />
                </div>
              </li>
            ))
          ) : (
            <li className={'font-neo'}>{constants.GROUP_MEESAGE.NO_MESSAGE}</li>
          )}
        </ul>
        <div className='flex justify-center mt-1'>
          <Button
            text={'닫기'}
            size={'alarm'}
            color={'navy'}
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupMessage;
