// bearStore.js
import { create } from 'zustand';

const useBearStore = create((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
}));

export default useBearStore;
