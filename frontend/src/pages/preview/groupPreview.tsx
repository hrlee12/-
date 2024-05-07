import { useEffect, useState } from 'react';
import SmallFrameNoCat from '@/components/frame/smallFrame/noCat.tsx';
import PomodoroTimer from '@/components/timer/PomodoroTimer.tsx';
import useTimerStore from '@/stores/useTimerStore';
import { calculateTimerValues } from '@/components/timer/realTime';
import { useNavigate } from 'react-router-dom';

const GroupPreview = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [nowIsFocus, setNowIsFocus] = useState(false);
  const [nowTimeDuration, setNowTimeDuration] = useState(0);
  const [nowRepeat, setNowRepeat] = useState(0);
  // const [storedTime, setStoredTime] = useState(0);
  // const [breakTime, setBreakTime] = useState(0);
  // const [focusTime, setFocusTime] = useState(0);
  // const [repeatCount, setRepeatCount] = useState(0);
  const [timer, setTimer] = useState<React.ReactElement | undefined>(undefined);

  const navigate = useNavigate();

  const storedTime = useTimerStore.getState().startTime;
  const focusTime = useTimerStore.getState().concentrateTime;
  const breakTime = useTimerStore.getState().concentrateTime;
  const repeatCount = useTimerStore.getState().endPeriod;

  useEffect(() => {
    // setStoredTime(useTimerStore.getState().startTime);
    // setBreakTime(useTimerStore.getState().relaxTime);
    // setFocusTime(useTimerStore.getState().concentrateTime);
    // setRepeatCount(useTimerStore.getState().endPeriod);
    const currentTime = Date.now();
    console.log(Math.floor((currentTime - storedTime) / 1000));
    const { nowIsFocus, nowTimeDuration, nowRepeat } = calculateTimerValues(
      storedTime,
      focusTime,
      breakTime,
      repeatCount,
      // useTimerStore.getState().startTime,
      // useTimerStore.getState().concentrateTime,
      // useTimerStore.getState().relaxTime,
      // useTimerStore.getState().endPeriod,
      currentTime,
    );
    // console.log(
    //   nowIsFocus +
    //     '<- 이건 집중, 오른쪽은 Duration ' +
    //     nowTimeDuration +
    //     '  오른쪽은 반복 횟수' +
    //     nowRepeat,
    // );
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

  return (
    <>
      {isHovered && (
        <div>
          <SmallFrameNoCat>
            {timer == undefined ||
            (!nowIsFocus && nowTimeDuration == -1 && nowRepeat - 1) ? (
              <div className='font-dnf'>타이머를 설정해주세요</div>
            ) : (
              timer
            )}
          </SmallFrameNoCat>
        </div>
      )}
      <div
        className='character-idle fixed right-[10px] bottom-[10px]'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate('/previewAlone')}
      />
    </>
  );
};

export default GroupPreview;
