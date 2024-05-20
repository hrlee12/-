export interface MakeGroupInfo {
  partyName: string;
  partyInviteMessage: string;
  partyParticipateNumber: number;
  partyMembers: Member[];
}

export interface UpdateGroupInfo {
  partyId: number;
  partyName: string;
  partyGoal: string;
  partyManagerId: number;
}

export interface InviteMessage {
  memberId: number;
  memberName: string;
  partyId: number;
  partyName: string;
}

export interface GroupProps {
  partyId: number;
  partyName: string;
  partyGoal: string;
  partyManagerId: number;
  memberCatName: string;
  partyManagerName: string;
  partyMembers: GroupMembers[];
}

export interface GroupMembers {
  partyManagerName: string;
  catId: number;
  memberId: number;
  memberCatName: string;
}

export interface JoinGroupInfo {
  partyId: number;
  partyName: string;
  partyGoal: string;
  currentNum: number;
  maxNum: number;
  lastChatter: string;
  lastChatterContent: string;
  lastSendChatTime: string;
}

export interface GroupDetailProps {
  group: {
    partyId: number;
    partyName: string;
    partyGoal: string | null;
    currentNum: number;
  };
}
