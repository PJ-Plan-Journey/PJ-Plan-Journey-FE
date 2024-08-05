import { create } from 'zustand';

const useStepStore = create((set) => ({
  step: 1,
  title: '',

  setStep: (step) => set({ step }),
  setTitle: (title) => set({ title }),
}));

export default useStepStore;
