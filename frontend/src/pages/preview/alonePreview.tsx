import { useEffect, useState } from 'react';
import SmallFrameNoCat from '@/components/frame/smallFrame/noCat.tsx';
import PomodoroTimer from '@/components/timer/PomodoroTimer.tsx';
import useTimerStore from '@/stores/useTimerStore';
import { calculateTimerValues } from '@/components/timer/realTime';
import { useNavigate } from 'react-router-dom';
import { MyInfoProps } from '@/types/member';
import { getMyInfo } from '@/apis/member';
import ProgressBar from '@/components/progressbar/ProgressBar';
import IdleCat from '@/components/cat/idle';
import { useSkinStore } from '@/stores/useSkinStore';

const AlonePreview = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [nowIsFocus, setNowIsFocus] = useState(false);
  const [nowTimeDuration, setNowTimeDuration] = useState(0);
  const [nowRepeat, setNowRepeat] = useState(0);
  const [timer, setTimer] = useState<React.ReactElement | undefined>(undefined);
  const [myInfo, setMyInfo] = useState<MyInfoProps>({
    memberExp: 0,
    memberCreatedAt: '',
    memberCatName: '',
    memberHitNumber: 0,
    memberBehitNumber: 0,
    level: 1,
    memberGoal: '',
    titleContent: '',
    catAssetUrl: '',
  });

  const navigate = useNavigate();

  const storedTime = useTimerStore.getState().startTime;
  const focusTime = useTimerStore.getState().concentrateTime;
  const breakTime = useTimerStore.getState().relaxTime;
  const repeatCount = useTimerStore.getState().endPeriod;

  useEffect(() => {
    const currentTime = Date.now();
    const { nowIsFocus, nowTimeDuration, nowRepeat } = calculateTimerValues(
      storedTime,
      focusTime,
      breakTime,
      repeatCount,
      currentTime,
    );

    setNowIsFocus(nowIsFocus);
    setNowTimeDuration(nowTimeDuration);
    setNowRepeat(nowRepeat);
    setTimer(
      <PomodoroTimer
        nowIsFocus={nowIsFocus}
        nowTimeDuration={nowTimeDuration}
        nowRepeat={nowRepeat}
        breakTime={breakTime}
        focusTime={focusTime}
        repeatCount={repeatCount}
      />,
    );
  }, [isHovered, breakTime, focusTime, repeatCount, storedTime]);

  useEffect(() => {
    setIsHovered(true);
    const timer = setTimeout(() => {
      setIsHovered(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const response = await getMyInfo();
        setMyInfo(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyInfo();
  }, [isHovered]);

  return (
    <>
      {isHovered && (
        <div>
          <SmallFrameNoCat>
            <div className='flex flex-col justify-between p-4 space-y-4 w-[205px] font-neo font-bold text-lg'>
              <div className='flex justify-between'>
                <span className='text-sm'>LV.{myInfo.level}</span>
                {myInfo.titleContent.length > 6 ? (
                  <span className='text-sm'>{myInfo.titleContent}</span>
                ) : (
                  <span>{myInfo.titleContent}</span>
                )}
              </div>
              <ProgressBar value={myInfo.memberExp} max={100} />
              <div>{myInfo.memberCatName}</div>
              <div className='flex justify-between'>
                <span>{myInfo.memberHitNumber}</span>
                <span>{myInfo.memberBehitNumber}</span>
              </div>
              <div className='absolute right-0 pr-4 bottom-1'>
                {timer == undefined ||
                (!nowIsFocus && nowTimeDuration == -1 && nowRepeat - 1) ? (
                  <div className='absolute font-dnf w-[205px] right-0 pl-2 bottom-20'>
                    타이머를 설정해주세요
                  </div>
                ) : (
                  <>{timer}</>
                  // fixed right-24 bottom-[85px]
                )}
              </div>
            </div>
          </SmallFrameNoCat>
        </div>
      )}
      <IdleCat
        catId={useSkinStore.getState().skinId}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate('/previewTwo')}
      />
    </>
  );
};

export default AlonePreview;
