import Button from '@/components/button';
import { useNavigate } from 'react-router-dom';
import BasicFrame from '@/components/frame/basicFrame';
import * as constants from '@/pages/group/constants';
import Pomodoro from '@/components/timer/pomodoro';

// interface GroupProps {
//   groupName: string;
//   member: number;
//   maxMember: number;
//   goal: string;
// }

const GroupInfoPage = () => {
  const navigate = useNavigate();

  return (
    <BasicFrame>
      <div className='flex flex-col'>
        <div className='flex flex-row place-content-around gap-10'>
          <div className='font-dnf text-4xl pl-3 pt-8'>
            {constants.GROUP_INFO.INFO}
          </div>
          <div className='font-dnf text-2xl pt-10'>
            {constants.GROUP_INFO.COUNT}
          </div>
        </div>
        <div className='font-dnf text-2xl pl-5 pt-3'>
          {constants.GROUP_INFO.GOAL}
        </div>
        <div className='font-dnf text-2xl pl-5 pt-1'>
          {constants.GROUP_INFO.COUNT}
        </div>
        <div className='flex flex-col font-dnf text-2xl pl-5 py-2'>
          뽀모도로
        </div>
        <Pomodoro />
        <div className='flex justify-center pt-3'>
          <Button
            text={'그룹 설정'}
            size='small'
            color='navy'
            onClick={() => navigate('/groupSetting')}
          />
          <Button
            text={'그룹 탈퇴'}
            size='small'
            color='gray'
            onClick={() => {}}
          />
          <Button
            text={'뒤로 가기'}
            size='small'
            color='gray'
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
    </BasicFrame>
  );
};

export default GroupInfoPage;
