import { useNavigate } from 'react-router-dom';

interface GroupDetailProps {
  group: {
    partyId: number;
    partyName: string;
    partyGoal: string | null;
    currentNum: number;
  };
}

const Group = ({ group }: GroupDetailProps) => {
  const navigate = useNavigate();
  const groupId = group.partyId;

  return (
    <div
      className='pl-1 pt-8 pb-1'
      onClick={() => navigate(`/groupInfo/${groupId}`)}
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
