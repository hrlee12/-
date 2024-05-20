import { create } from 'zustand';

interface CatState {
  catIdList: { memberId: number; catId: number }[];
  setCatIdList: (catIdList: { memberId: number; catId: number }[]) => void;
}

export const useCatStore = create<CatState>((set) => ({
  catIdList: [],
  setCatIdList: (catIdList) => set({ catIdList }),
}));
