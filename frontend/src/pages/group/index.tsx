import { useEffect, useState } from 'react';
import BasicFrame from '@/components/frame/basicFrame';
import { useNavigate } from 'react-router-dom';
import { FaCircleXmark, FaMessage, FaPlus } from 'react-icons/fa6';
import * as constants from '@/pages/group/constants';
import Button from '@/components/button';
import GroupMessage from '@/pages/group/GroupMessage.tsx';
import { InviteMessage, JoinGroupInfo } from '@/types/group';
import { getGroup, groupMessageList } from '@/apis/group.ts';
import Group from '@/pages/group/Group.tsx';

const GroupPage = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<JoinGroupInfo[]>([]);
  const [messages, setMessages] = useState<InviteMessage[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchMyInfo = async () => {
      const groupResponse = await getGroup();
      setGroups(groupResponse.partys);
    };

    fetchMyInfo();
  }, []);

  const checkMessage = async () => {
    const response = await groupMessageList();
    setMessages(response.inviteList);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <BasicFrame>
        <FaCircleXmark
          className='absolute mt-[0px] text-[35px] text-inputBoxColor bg-frameColor rounded-boxRadius'
          onClick={() => navigate('/')}
        />
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
                  onClick={() => navigate('/makeGroup')}
                />
              </div>
            </div>
            {showModal && (
              <GroupMessage messages={messages} onClose={closeModal} />
            )}
            {groups.length > 0 && (
              <div id='group-container' className='grid grid-cols-2 p-1'>
                {groups.map((group, index) => (
                  <Group key={index} group={group} />
                ))}
              </div>
            )}
          </div>
          {groups.length === 0 && (
            <div className='flex-grow flex items-center justify-center'>
              <pre className='font-neo text-3xl text-center'>
                {groups.length ? '' : constants.NO_GROUP_MESSAGE}
              </pre>
            </div>
          )}
          <div className='fixed bottom-28 right-36'>
            <Button
              text={'혼자하기'}
              size={'small'}
              color={'green'}
              onClick={() => navigate('/catSetting')}
            />
          </div>
        </div>
      </BasicFrame>
    </>
  );
};

export default GroupPage;
