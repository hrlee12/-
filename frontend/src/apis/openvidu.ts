import { useAuthStore } from '@/stores/useAuthStore';
import { axiosInstanceCustom } from './lib/axios';

export const fetchSession = async (groupId: string) => {
  try {
    const response = await axiosInstanceCustom.post('/sessions', {
      customSessionId: groupId,
    });

    const { setOpenViduSession } = useAuthStore.getState();
    setOpenViduSession(response.data);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchToken = async (sessionId: string) => {
  try {
    const response = await axiosInstanceCustom.post(
      `/sessions/${sessionId}/connections`,
    );

    const { setOpenViduToken } = useAuthStore.getState();
    setOpenViduToken(response.data);

    return response;
  } catch (error) {
    console.log(error);
  }
};
