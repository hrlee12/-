import { axiosInstance } from '@/apis/lib/axios.ts';
import { MakeGroupInfo, UpdateGroupInfo } from '@/types/group';

// 그룹 생성
export const makeGroup = async (MakeGroupInfo: MakeGroupInfo) => {
  try {
    const response = await axiosInstance.post('/party', {
      partyName: MakeGroupInfo.partyName,
      partyInviteMessage: MakeGroupInfo.partyMessage,
      partyMaxNumber: 6,
      partyParticipateNumber: MakeGroupInfo.memberCount,
      partyManagerId: MakeGroupInfo.partyManagerId,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 그룹 초대
export const inviteMember = async (memberId: number) => {
  try {
    // memberId의 닉네임을 불러올 수 있도록 호출
    const response = await axiosInstance.post(`/party/${memberId}/invite`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 그룹 초대 수락
export const acceptInvite = async (partyId: number) => {
  try {
    const response = await axiosInstance.post(`/party/${partyId}/accept`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 그룹 초대 거절
export const rejectInvite = async (partyId: number) => {
  try {
    const response = await axiosInstance.post(`/party/${partyId}/reject`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 그룹 초대 목록 리스트
export const groupMessageList = async () => {
  try {
    const response = await axiosInstance.get('party/invited-list');
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 가입 그룹 조회

// 그룹 삭제 (partyId 필요없나?)
export const deleteGroup = async () => {
  try {
    await axiosInstance.delete(`/party`);
  } catch (err) {
    console.log(err);
  }
};

// 그룹 설정 조회
export const groupDetail = async (partyId: number) => {
  try {
    const response = await axiosInstance.get(`/party/${partyId}/setting`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 그룹 정보 수정
export const updateGroup = async (UpdateGroupInfo: UpdateGroupInfo) => {
  try {
    const response = await axiosInstance.patch(
      `/party/${UpdateGroupInfo.partyId}/setting`,
      {
        partyName: UpdateGroupInfo.partyName,
        partyGoal: UpdateGroupInfo.partyGoal,
        partyManagerId: UpdateGroupInfo.partyManagerId,
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 그룹 탈퇴
export const leaveGroup = async (partyId: number) => {
  try {
    await axiosInstance.delete(`/party/${partyId}`);
  } catch (err) {
    console.log(err);
  }
};

// 그룹 멤버 조회
export const getMembers = async (partyId: number) => {
  try {
    const response = await axiosInstance.get(`/party/${partyId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
