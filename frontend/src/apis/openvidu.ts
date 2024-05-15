import { useAuthStore } from '@/stores/useAuthStore';
import { axiosInstance } from './lib/axios';

export const fetchSession = async (groupId: number) => {
  try {
    axiosInstance.defaults.baseURL = import.meta.env.VITE_OPENVIDU_URL;

    const response = await axiosInstance.post('/sessions', {
      customSessionId: groupId,
    });

    axiosInstance.defaults.baseURL = import.meta.env.VITE_API_URL;

    const { setOpenViduSession } = useAuthStore.getState();
    setOpenViduSession(response.data);

    console.log(response.data);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchToken = async (sessionId: string) => {
  try {
    axiosInstance.defaults.baseURL = import.meta.env.VITE_OPENVIDU_URL;

    const response = await axiosInstance.post(
      `/sessions/${sessionId}/connections`,
    );

    axiosInstance.defaults.baseURL = import.meta.env.VITE_API_URL;

    const { setOpenViduToken } = useAuthStore.getState();
    setOpenViduToken(response.data);

    return response;
  } catch (error) {
    console.log(error);
  }
};
