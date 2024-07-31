import { create } from 'zustand';

const useBearStore = create((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  user: {}, // 기본값으로 빈 객체 설정
  setUser: (user) => set({ user }),
}));

export default useBearStore;

