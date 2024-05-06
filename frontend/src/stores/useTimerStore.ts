import create from 'zustand';

interface TimerState {
  startTime: number;
  endPeriod: number;
  concentrateTime: number;
  relaxTime: number;
  isTimerRunning: boolean;
  setIsTimerRunning: (isRunning: boolean) => void;
  setStartTime: (time: number) => void;
  setEndPeriod: (period: number) => void;
  setConcentrateTime: (time: number) => void;
  setRelaxTime: (time: number) => void;
}

const useTimerStore = create<TimerState>((set) => ({
  startTime: Date.now(),
  endPeriod: 0,
  concentrateTime: 0,
  relaxTime: 0,
  isTimerRunning: false,
  setIsTimerRunning: (isRunning: boolean) =>
    set(() => ({ isTimerRunning: isRunning })),
  setStartTime: (time: number) => set(() => ({ startTime: time })),
  setEndPeriod: (period: number) => set(() => ({ endPeriod: period })),
  setConcentrateTime: (time: number) => set(() => ({ concentrateTime: time })),
  setRelaxTime: (time: number) => set(() => ({ relaxTime: time })),
}));

export default useTimerStore;
