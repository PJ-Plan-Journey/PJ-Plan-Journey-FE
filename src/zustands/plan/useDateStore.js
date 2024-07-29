import { create } from 'zustand';

const useDateStore = create((set) => ({
  startDate: null,
  endDate: null,
  setDates: ({ startDate, endDate }) =>
    set({
      startDate,
      endDate,
    }),
}));

export default useDateStore;
