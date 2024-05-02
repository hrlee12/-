import { axiosInstance } from '@/apis/lib/axios.ts';

export const signUp = async (
  userId: string,
  userNickname: string,
  password: string,
) => {
  try {
    const response = await axiosInstance.post('/auth', {
      id: userId,
      nickname: userNickname,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const logIn = async (userId: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      id: userId,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
