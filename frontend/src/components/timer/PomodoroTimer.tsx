import { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import * as constants from '@/components/timer/constants';
import useTimerStore from '@/stores/useTimerStore';
import { endTimer } from '@/apis/pomodoro';

interface TimerProps {
  nowIsFocus: boolean;
  nowTimeDuration: number;
  nowRepeat: number;
  focusTime: number;
  breakTime: number;
  repeatCount: number;
}

const PomodoroTimer = ({
  nowIsFocus,
  nowTimeDuration,
  nowRepeat,
  focusTime,
  breakTime,
  repeatCount,
}: TimerProps) => {
  // 집중 시간과 휴식 시간을 번갈아가며 사용하기 위한 상태
  const [isFocusing, setIsFocusing] = useState(nowIsFocus);
  const [currentRepeat, setCurrentRepeat] = useState(nowRepeat);
  const [key, setKey] = useState(0); // 타이머를 재시작하기 위한 키

  // 타이머가 완료될 때 호출될 함수
  const handleComplete = () => {
    // console.log(currentRepeat);
    // 모든 반복이 완료되었는지 확인
    if (currentRepeat === repeatCount * 2 - 1) {
      // 모든 작업이 완료된 후 추가 작업
      const timerId = useTimerStore.getState().timerId;
      const period = useTimerStore.getState().endPeriod;
      endTimer(timerId, period);

      return { shouldRepeat: false };
    }

    // 집중 시간과 휴식 시간을 전환
    setIsFocusing(!isFocusing);

    // 현재 반복 횟수 증가
    setCurrentRepeat(currentRepeat + 1);

    // 타이머를 재시작하기 위한 키 업데이트
    setKey((prevKey) => prevKey + 1);

    return { shouldRepeat: false };
  };

  // 현재 타이머의 시간을 결정
  const timerDuration: number = isFocusing ? focusTime * 60 : breakTime * 60;

  // 시간 형식 기능
  function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    <CountdownCircleTimer
      key={key} // key 변경으로 컴포넌트 리셋
      isPlaying
      initialRemainingTime={timerDuration - nowTimeDuration}
      duration={timerDuration}
      colors={
        isFocusing ? constants.COLORS.WORK_COLOR : constants.COLORS.REST_COLOR
      }
      colorsTime={[
        timerDuration,
        timerDuration * 0.75,
        timerDuration * 0.5,
        timerDuration * 0.25,
        0,
      ]}
      onComplete={handleComplete}
    >
      {({ remainingTime }) => (
        <div>
          {remainingTime === 0 ? (
            <div
              className='font-dnf text-2xl text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'
              style={{ color: 'darkgrey' }}
            >
              {constants.END}
            </div>
          ) : (
            <>
              <div
                className='font-dnf text-2xl text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'
                style={{ color: 'whitesmoke' }}
              >
                {formatTime(remainingTime)}
              </div>
              <div
                className='font-neo text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'
                style={{ color: 'whitesmoke' }}
              >
                {isFocusing ? constants.FOCUS_TIME : constants.REST_TIME}
              </div>
            </>
          )}
        </div>
      )}
    </CountdownCircleTimer>
  );
};

export default PomodoroTimer;
