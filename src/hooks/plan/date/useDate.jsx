import { addDays, differenceInDays, format } from 'date-fns';
import { useEffect, useState } from 'react';

const useDate = () => {
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
    totalDays: null,
    days: [],
  });

  const calculateTotalDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start;
    return timeDifference / (1000 * 3600 * 24) + 1;
  };

  const calculateDaysArray = (startDate, endDate) => {
    if (!startDate || !endDate) return [];
    const daysCount =
      differenceInDays(new Date(endDate), new Date(startDate)) + 1;

    return Array.from({ length: daysCount }, (_, index) =>
      format(addDays(new Date(startDate), index), 'yyyy-MM-dd')
    );
  };

  useEffect(() => {
    if (dates.startDate && dates.endDate) {
      const totalDays = calculateTotalDays(dates.startDate, dates.endDate);
      const days = calculateDaysArray(dates.startDate, dates.endDate);

      setDates((prev) => ({
        ...prev,
        totalDays,
        days,
      }));
    }
  }, [dates.startDate, dates.endDate]);

  return { dates, setDates };
};

export default useDate;
