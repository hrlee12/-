import InputBox from '@/components/inputbox';
import Button from '@/components/button';
import * as constants from '@/components/timer/constants';

const Pomodoro = () => {
  return (
    <div>
      <div className='flex flex-row justify-center'>
        <InputBox
          name={'뽀모도로 분'}
          size={'pomodoro'}
          type={'number'}
          placeholder={'분'}
          onChange={() => {}}
        />
        <div className='font-dnf text-3xl p-1'>{constants.POMODORO.MIN}</div>
        <InputBox
          name={'뽀모도로 쉼'}
          size={'pomodoro'}
          type={'number'}
          placeholder={'쉼'}
          onChange={() => {}}
        />
        <div className='font-dnf text-3xl p-1'>{constants.POMODORO.REST}</div>
        <InputBox
          name={'뽀모도로 회'}
          size={'pomodoro'}
          type={'number'}
          placeholder={'회'}
          onChange={() => {}}
        />
        <div className='font-dnf text-3xl p-1'>{constants.POMODORO.COUNT}</div>
      </div>
      <div className='flex justify-center'>
        <Button
          text={'시작'}
          size={'small'}
          color={'blue'}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default Pomodoro;
