import React from 'react';
import { ColorHex, CountdownCircleTimer } from 'react-countdown-circle-timer';

// remainingTime의 타입을 정의하는 인터페이스
interface TimeProps {
  remainingTime: number;
}

const renderTime = ({ remainingTime }: TimeProps) => {
  if (remainingTime === 0) {
    return <div className='timer'>끗</div>;
  }

  return (
    <div className='timer'>
      <div className='text'>Remaining</div>
      <div className='value'>{remainingTime}</div>
      <div className='text'>seconds</div>
    </div>
  );
};

// CountdownTimer 컴포넌트의 props 타입을 정의하는 인터페이스
// <중요> 16진수(ex. #004777)로 표현되는 colors는 최소 2개, 이들이 변하는 시간도 최소 2개가 필요하다.
interface CountdownTimerProps {
  duration: number;
  colors: { 0: ColorHex } & { 1: ColorHex } & ColorHex[];
  colorsTime: { 0: number } & { 1: number } & number[];
  onComplete: () => { shouldRepeat: boolean; delay: number };
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  duration,
  colors,
  colorsTime,
  onComplete,
}) => {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={duration}
      colors={colors}
      colorsTime={colorsTime}
      onComplete={onComplete}
    >
      {renderTime}
    </CountdownCircleTimer>
  );
};

export default CountdownTimer;
