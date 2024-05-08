import { create } from 'zustand';

interface TimerState {
  startTime: number;
  endPeriod: number;
  concentrateTime: number;
  relaxTime: number;
  timerId: number;
  setStartTime: (time: number) => void;
  setEndPeriod: (period: number) => void;
  setConcentrateTime: (time: number) => void;
  setRelaxTime: (time: number) => void;
  setTimerId: (id: number) => void;
}

const useTimerStore = create<TimerState>((set) => ({
  startTime: 0,
  endPeriod: 0,
  concentrateTime: 0,
  relaxTime: 0,
  timerId: -1,
  setStartTime: (time: number) => set(() => ({ startTime: time })),
  setEndPeriod: (period: number) => set(() => ({ endPeriod: period })),
  setConcentrateTime: (time: number) => set(() => ({ concentrateTime: time })),
  setRelaxTime: (time: number) => set(() => ({ relaxTime: time })),
  setTimerId: (id: number) => set(() => ({ timerId: id })),
}));

export default useTimerStore;
