import { axiosInstance } from '@/apis/lib/axios.ts';

export const timerSet = async (
  type: string,
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
        type: type,
        startTime: startTime,
        endPeriod: endPeriod,
        concentrateTime: concentrateTime,
        relaxTime: relaxTime,
        groupId: groupId,
      });
    } else if (!groupId) {
      response = await axiosInstance.post('/pomodoro', {
        type: type,
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
