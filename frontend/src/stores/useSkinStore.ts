import { create } from 'zustand';

interface SkinState {
  skinId: number;
  skinUrl: string;
  setSkinId: (skinId: number) => void;
  setSkinUrl: (skinUrl: string) => void;
}

export const useSkinStore = create<SkinState>((set) => ({
  skinId: 1,
  skinUrl: 'https://mogaknyan.s3.ap-northeast-2.amazonaws.com/cat_idle_01.png',
  setSkinId: (id: number) => {
    set({ skinId: id });
  },
  setSkinUrl: (url: string) => {
    set({ skinUrl: url });
  },
}));
