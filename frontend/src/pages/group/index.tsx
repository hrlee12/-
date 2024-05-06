import { useState, useEffect } from 'react';
import BasicFrame from '@/components/frame/basicFrame';
import { useNavigate } from 'react-router-dom';
import { FaMessage, FaPlus } from 'react-icons/fa6';
import * as constants from '@/pages/group/constants';
import Button from '@/components/button';
import GroupMessage from '@/pages/group/GroupMessage.tsx';
import { InviteMessage } from '@/types/group';
import { groupMessageList } from '@/apis/group.ts';
import Group from '@/pages/group/Group.tsx';

const GroupPage = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [messages, setMessages] = useState<InviteMessage[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const checkMessage = async () => {
    const response = await groupMessageList();
    setMessages(response.inviteList);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <BasicFrame>
      <div className='flex flex-col justify-between h-96'>
        <div>
          <div className='flex place-content-around gap-40 pt-8'>
            <div className='font-dnf text-4xl pb-3'>
              {constants.GROUP_INFO.GROUP}
            </div>
            <div className='flex flex-row gap-3 pt-3'>
              <FaMessage
                size={'25'}
                className='cursor-pointer'
                onClick={checkMessage}
              />
              <FaPlus
                size={'25'}
                className='cursor-pointer'
                onClick={() => navigate('/groupSetting')}
              />
            </div>
          </div>
          {groups.length > 0 && (
            <div id='group-container' className='grid grid-cols-2 p-1'>
              {groups.map((group, index) => (
                <Group key={index} group={group} /> // Group 컴포넌트에 group 객체 전달
              ))}
            </div>
          )}
          {showModal && (
            <GroupMessage messages={messages} onClose={closeModal} />
          )}
        </div>
        <div className='flex-grow flex items-center justify-center'>
          <pre className='font-neo text-3xl text-center'>
            {groups.length ? '' : constants.NO_GROUP_MESSAGE}
          </pre>
        </div>
        <div className='fixed bottom-12 right-32'>
          <Button
            text={'혼자하기'}
            size={'small'}
            color={'navy'}
            onClick={() => navigate('/catInfo')}
          />
        </div>
      </div>
    </BasicFrame>
  );
};

export default GroupPage;
