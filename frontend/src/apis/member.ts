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

// 친구 검색
export const getSearchFriend = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/member/search?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 칭호 리스트 불러오기
export const getTitleList = async () => {
  try {
    const response = await axiosInstance.get(
      `member/title?pageNum=${1}&pageSize=${30}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 스킨 리스트 불러오기
export const getMySkin = async () => {
  try {
    const response = await axiosInstance.get(
      `/member/skins?pageNum=${1}&pageSize=${50}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const patchMySkin = async (catId: number) => {
  try {
    const response = await axiosInstance.patch(`/member/skins`, {
      catId: catId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// memberId로 catId 조회
interface MemberId {
  memberId: number;
}
export const getCatId = async (memberIdList: MemberId[]) => {
  try {
    const response = await axiosInstance.post(`/member/cat`, { memberIdList });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
