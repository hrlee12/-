// 내 정보 조회
import { axiosInstance } from '@/apis/lib/axios.ts';

export const getMyInfo = async () => {
  try {
    const response = await axiosInstance.get('/member');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 회원 정보 등록
export const postMyInfo = async () => {
  try {
    const response = await axiosInstance.post('/member');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 회원 정보 수정
export const patchMyInfo = async () => {
  try {
    const response = await axiosInstance.patch('/member');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 친구 검색
export const getSearchFriend = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/member/search?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
