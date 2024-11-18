import { useEffect, useState } from 'react';

const useDate = () => {
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
    totalDays: null,
  });

  const calculateTotalDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start;
    return timeDifference / (1000 * 3600 * 24) + 1;
  };

  useEffect(() => {
    if (dates.startDate && dates.endDate) {
      const totalDays = calculateTotalDays(dates.startDate, dates.endDate);

      setDates((prev) => ({
        ...prev,
        totalDays,
      }));
    }
  }, [dates.startDate, dates.endDate]);

  return { dates, setDates };
};

export default useDate;
