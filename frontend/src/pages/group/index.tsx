// import { useState } from 'react';

import BasicFrame from '@/components/frame/basicFrame';

import { useNavigate } from 'react-router-dom';
import { FaMessage, FaPlus } from 'react-icons/fa6';

import * as constants from '@/pages/group/constants';
import Button from '@/components/button';
import Group from '@/pages/group/Group.tsx';
import { groupMessageList } from '@/apis/group.ts';
import { useState } from 'react';
import GroupMessage from '@/pages/group/GroupMessage.tsx';

const GroupPage = () => {
  const navigate = useNavigate();
  // const [groups, setGroups] = useState([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const checkMessage = async () => {
    // const response = await groupMessageList();
    // setMessages(response);
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
              {/*하,, 나중에 몇개 왔는지 숫자??*/}
              <FaMessage
                size={'25'}
                className='cursor-pointer'
                onClick={checkMessage}
              />
              <FaPlus
                size={'25'}
                className='cursor-pointer'
                onClick={() => navigate('/makeGroup')}
              />
            </div>
          </div>

          {/*이 Group의 id를 가져와서 id를 통해 조회가 가능해져야함. 추후에 onClick 붙이기*/}
          {/*<div id='group-container' className='grid grid-cols-2 p-1'>
          {groups.map((group, index) => (
              <Group key={index}/>
          ))}
        </div>*/}
          {showModal && (
            <GroupMessage messages={messages} onClose={closeModal} />
          )}
          {/*Group을 확인하고 싶으면 여기서*/}
          <div className='flex-col grid grid-cols-2 p-1 place-items-start overflow-auto'>
            <Group />
          </div>
        </div>

        {/* Group 조회 API 후, groups.length가 0일 때 초대 메세지 표시*/}
        {/*컴포넌트로 분리할지 고민해보기, Group 없애면 중간으로 옴*/}
        <div className='flex-grow flex items-center justify-center'>
          <pre className='font-neo text-3xl text-center'>
            {constants.NO_GROUP_MESSAGE}
          </pre>
        </div>

        <div className='fixed bottom-12 right-32'>
          <Button
            text={'혼자하기'}
            size={'small'}
            color={'navy'}
            onClick={() => navigate('/info')}
          />
        </div>
      </div>
    </BasicFrame>
  );
};

export default GroupPage;
