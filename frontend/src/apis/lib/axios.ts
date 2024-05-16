import axios from 'axios';
import { useAuthStore } from '@/stores/useAuthStore.ts';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // 쿠키를 포함
});

//accessToken 자동으로 헤더에 추가
axiosInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken && config.headers) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

export const axiosInstanceCustom = axios.create({
  baseURL: import.meta.env.VITE_OPENVIDU_URL,
  withCredentials: true, // 쿠키를 포함
});

//accessToken 자동으로 헤더에 추가
axiosInstanceCustom.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken && config.headers) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});
