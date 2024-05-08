import { axiosInstance } from '@/apis/lib/axios.ts';

export const timerSet = async (
  startTime: string,
  endPeriod: number,
  concentrateTime: number,
  relaxTime: number,
  groupId?: number,
) => {
  try {
    let response;
    if (groupId) {
      response = await axiosInstance.post('/pomodoro', {
        type: 'group',
        startTime: startTime,
        endPeriod: endPeriod,
        concentrateTime: concentrateTime,
        relaxTime: relaxTime,
        groupId: groupId,
      });
    } else if (!groupId) {
      response = await axiosInstance.post('/pomodoro', {
        type: 'personal',
        startTime: startTime,
        endPeriod: endPeriod,
        concentrateTime: concentrateTime,
        relaxTime: relaxTime,
      });
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const endTimer = async (timerId: number, period: number) => {
  try {
    const response = await axiosInstance.post('/pomodoro/result', {
      timerId: timerId,
      period: period,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
