import { axiosInstance } from '@/apis/lib/axios.ts';

// 연관성 있는 프로세스인지 판별
export const getValidProcess = async (process: string) => {
  try {
    const response = await axiosInstance.post('/pomodoro/top-process', {
      top: process,
      url: '',
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
