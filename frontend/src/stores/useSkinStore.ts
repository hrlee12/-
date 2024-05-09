import { create } from 'zustand';

interface SkinState {
  skinId: number;
  setSkinId: (skinId: number) => void;
}

export const useSkinStore = create<SkinState>((set) => ({
  skinId: 1,
  setSkinId: (id: number) => {
    set({ skinId: id });
  },
}));
