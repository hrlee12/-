//accessToken 상태관리
import { create } from 'zustand';

interface AuthState {
  accessToken: number | null;
  openViduSession: string;
  openViduToken: string;
  setAccessToken: (accessToken: number | null) => void;
  setOpenViduSession: (openViduSession: string) => void;
  setOpenViduToken: (openViduToken: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  openViduSession: '',
  openViduToken: '',
  setAccessToken: (accessToken) => set({ accessToken: accessToken }),
  setOpenViduSession: (openViduSession) =>
    set({ openViduSession: openViduSession }),
  setOpenViduToken: (openViduToken) => set({ openViduToken: openViduToken }),
}));
