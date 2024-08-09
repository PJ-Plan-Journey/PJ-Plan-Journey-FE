// src/zustands/useAuthStore.js
import create from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (userData, accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        set({ isAuthenticated: true, user: userData });
      },
      logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: 'auth', // 로컬 스토리지에 저장될 키
      getStorage: () => localStorage, // 기본값은 localStorage
    }
  )
);

export default useAuthStore;
