import InputBox from '@/components/inputbox';
import Button from '@/components/button';
import * as constants from '@/components/timer/constants';
import { timerSet } from '@/apis/pomodoro.ts';
import { useState } from 'react';
import useTimerStore from '@/stores/useTimerStore.ts';
import { useNavigate } from 'react-router-dom';

interface GroupIdProps {
  groupId: number;
}

const MultiPomodoro = ({ groupId }: GroupIdProps) => {
  const [concentrateTime, setConcentrateTime] = useState(0);
  const [relaxTime, setRelaxTime] = useState(0);
  const [endPeriod, setEndPeriod] = useState(0);

  const partyId = groupId;

  const navigate = useNavigate();

  function formatTime(date: Date) {
    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
  }

  const startTimer = async (
    endPeriod: number,
    concentrateTime: number,
    relaxTime: number,
    groupId?: number,
  ) => {
    const startTime2: string = formatTime(new Date());
    let response;
    if (groupId) {
      response = await timerSet(
        startTime2,
        endPeriod,
        concentrateTime,
        relaxTime,
        groupId,
      );
    } else if (!groupId) {
      response = await timerSet(
        startTime2,
        endPeriod,
        concentrateTime,
        relaxTime,
      );
    }

    const timerId = response?.data.timerId;

    const startTime = Date.now();

    useTimerStore.setState({
      startTime,
      endPeriod,
      concentrateTime,
      relaxTime,
      timerId,
    });

    navigate('/previewTwo', { state: { partyId } });
  };

  return (
    <div>
      <div className='flex flex-row justify-center'>
        <InputBox
          name={'뽀모도로 분'}
          size={'pomodoro'}
          type={'number'}
          placeholder={'분'}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setConcentrateTime(isNaN(value) ? 0 : value);
          }}
        />
        <div className='font-dnf text-3xl p-1'>{constants.POMODORO.MIN}</div>
        <InputBox
          name={'뽀모도로 쉼'}
          size={'pomodoro'}
          type={'number'}
          placeholder={'쉼'}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setRelaxTime(isNaN(value) ? 0 : value);
          }}
        />
        <div className='font-dnf text-3xl p-1'>{constants.POMODORO.REST}</div>
        <InputBox
          name={'뽀모도로 회'}
          size={'pomodoro'}
          type={'number'}
          placeholder={'회'}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setEndPeriod(isNaN(value) ? 0 : value);
          }}
        />
        <div className='font-dnf text-3xl p-1'>{constants.POMODORO.COUNT}</div>
      </div>
      <div className='flex justify-center'>
        <Button
          text={'시작'}
          size={'small'}
          color={'blue'}
          onClick={() =>
            startTimer(endPeriod, concentrateTime, relaxTime, partyId)
          }
        />
      </div>
    </div>
  );
};

export default MultiPomodoro;
