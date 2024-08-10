import { create } from 'zustand';

const useStepStore = create((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
}));

export default useStepStore;
