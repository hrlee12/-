import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { GroupDetailProps } from '@/types/group';
import { Socket } from '@/apis/websocket/Socket.ts';

const Group = ({ group }: GroupDetailProps) => {
  const navigate = useNavigate();
  const groupId = group.partyId;
  const memberId: number | null = useAuthStore.getState().accessToken;

  const openGroup = async (groupId: number, memberId: number | null) => {
    try {
      const socket = new Socket();
      const url = `https://mogaknyang-back.duckdns.org/status?memberId=${memberId}&partyId=${groupId}`;
      socket.connect(url);
      navigate(`/groupInfo/${groupId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className='pl-1 pt-8 pb-1'
      onClick={() => openGroup(groupId, memberId)}
    >
      <div className='bg-groupColor w-48 h-24 rounded-3xl'>
        <div className='flex place-content-around gap-8 pt-3'>
          <div className='font-dnf'>{group.partyName}</div>
          <div className='font-dnf'>{group.currentNum + 1} /6 </div>
        </div>
        <div className='font-neo pl-3'>{group.partyGoal}</div>
      </div>
    </div>
  );
};

export default Group;
