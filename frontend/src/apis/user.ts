import { axiosInstance } from '@/apis/lib/axios.ts';

export const signUp = async (
  userId: string,
  userNickname: string,
  password: string,
) => {
  try {
    return await axiosInstance.post('/auth', {
      id: userId,
      nickname: userNickname,
      password: password,
    });
  } catch (error) {
    console.log(error);
  }
};
