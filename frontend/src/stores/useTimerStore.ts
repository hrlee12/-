import create from 'zustand';

interface TimerState {
  startTime: number;
  isTimerRunning: boolean;
  setIsTimerRunning: (isRunning: boolean) => void;
  setStartTime: (time: number) => void;
}

const useTimerStore = create<TimerState>((set) => ({
  startTime: Date.now(),
  isTimerRunning: false,
  setIsTimerRunning: (isRunning: boolean) =>
    set(() => ({ isTimerRunning: isRunning })),
  setStartTime: (time: number) => set(() => ({ startTime: time })),
}));

export default useTimerStore;
