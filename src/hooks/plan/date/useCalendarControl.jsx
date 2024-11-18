import { useRef, useState } from 'react';
import { format } from 'date-fns';

const useCalendarControl = (months) => {
  const CURRENTYEAR = new Date().getFullYear();
  const yearOptions = [];
  const [year, setYear] = useState(CURRENTYEAR);
  const [month, setMonth] = useState('01');

  const monthRefs = useRef([]);

  for (let i = CURRENTYEAR; i <= CURRENTYEAR + 2; i++) {
    yearOptions.push(i);
  }

  const scrollToDate = () => {
    const targetMonthIndex = months.findIndex(
      (m) => format(m, 'yyyy-MM') === `${year}-${month.padStart(2, '0')}`
    );

    if (targetMonthIndex !== -1 && monthRefs.current[targetMonthIndex]) {
      monthRefs.current[targetMonthIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      alert('해당 날짜로 이동할 수 없습니다.');
    }
  };

  const scrollToTop = () => {
    if (monthRefs.current[0]) {
      monthRefs.current[0].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const scrollToBottom = () => {
    const lastIndex = months.length - 1;
    if (monthRefs.current[lastIndex]) {
      monthRefs.current[lastIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  };

  return {
    year,
    setYear,
    setMonth,
    month,
    monthRefs,
    yearOptions,
    scrollToDate,
    scrollToTop,
    scrollToBottom,
  };
};

export default useCalendarControl;
