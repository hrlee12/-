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
export const patchMyInfo = async (data: {
  memberCatName: string;
  memberGoal: string;
  titleId: number;
}) => {
  try {
    const response = await axiosInstance.patch('/member', data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
