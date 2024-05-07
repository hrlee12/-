//accessToken 상태관리
import { create } from 'zustand';

interface AuthState {
  accessToken: number | null;
  setAccessToken: (accessToken: number | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  setAccessToken: (accessToken) => set({ accessToken: accessToken }),
}));
