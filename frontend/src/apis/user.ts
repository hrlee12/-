import { axiosInstance } from '@/apis/lib/axios.ts';
import { useAuthStore } from '@/stores/useAuthStore.ts';

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
    return response;
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

    const { setAccessToken } = useAuthStore.getState();
    setAccessToken(response.data);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const logOut = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');

    const { setAccessToken } = useAuthStore.getState();
    setAccessToken(response.data);

    return response;
  } catch (error) {
    console.log(error);
  }
};
