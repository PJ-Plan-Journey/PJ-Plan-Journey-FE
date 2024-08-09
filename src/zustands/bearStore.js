import { create } from 'zustand';

const useBearStore = create((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  user: {},
  setUser: (user) => set({ user }),
}));

export default useBearStore;

