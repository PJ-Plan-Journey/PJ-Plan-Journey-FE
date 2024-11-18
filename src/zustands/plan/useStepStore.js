import { create } from 'zustand';

const useStepStore = create((set) => ({
  step: 1,
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
}));

export default useStepStore;
