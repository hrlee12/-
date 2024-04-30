//accessToken 재발급 함수
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { axiosInstance } from '@/apis/lib/axios.ts';

export const reissueToken = async () => {
  try {
    // api end-point 수정
    const response = await axiosInstance.get('/auth/refresh');
    const newAccessToken = response.headers['accessToken'];
    if (newAccessToken) {
      useAuthStore.getState().setAccessToken(newAccessToken);
      return newAccessToken;
    }
  } catch (error) {
    useAuthStore.getState().setAccessToken(null); //accessToken 초기화
  }
  return null;
};
