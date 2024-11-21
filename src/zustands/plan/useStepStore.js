import { create } from 'zustand';

const useStepStore = create((set) => ({
  step: 1,
  setStep: (value) => set(() => ({ step: value })),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
}));

export default useStepStore;
