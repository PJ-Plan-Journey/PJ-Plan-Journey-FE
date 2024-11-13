import { addDays, differenceInDays, format } from 'date-fns';
import { create } from 'zustand';

const useDateStore = create((set, get) => ({
  startDate: null,
  endDate: null,
  setDates: ({ startDate, endDate }) =>
    set({
      startDate,
      endDate,
    }),

  getDays: () => {
    const { startDate, endDate } = get();
    if (!startDate || !endDate) return [];

    const daysCount =
      differenceInDays(new Date(endDate), new Date(startDate)) + 1;

    return Array.from({ length: daysCount }, (_, index) =>
      format(addDays(new Date(startDate), index), 'yyyy-MM-dd')
    );
  },
}));

export default useDateStore;
