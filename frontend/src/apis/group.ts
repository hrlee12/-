// 그룹 초대
import { axiosInstance } from '@/apis/lib/axios.ts';

export const inviteMember = async (memberId: number) => {
  try {
    await axiosInstance.post(`/party/${memberId}/invite`);
  } catch (err) {
    console.error(err);
  }
};
