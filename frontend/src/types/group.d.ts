export interface MakeGroupInfo {
  partyName: string;
  partyMessage: string;
  memberCount: number;
  partyManagerId: number;
}

export interface UpdateGroupInfo {
  partyId: number;
  partyName: string;
  partyGoal: string;
  partyManagerId: number;
}
