import { axiosInstance } from '@/apis/lib/axios.ts';

export const signUp = async (userId: string, password: string) => {
  try {
    return await axiosInstance.post('/auth', {
      id: userId,
      password: password,
    });
  } catch (error) {
    console.log(error);
  }
};
