import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import {
  startOfDay,
  isSameDay,
  isWithinInterval,
  startOfMonth,
  endOfMonth,
} from 'date-fns';
import useDateStore from '@zustand/useDateStore';
import CustomHeader from '@components/createPlan/CustomHeader';
import * as S from '@styles/CustomCalendar.style';

const CustomCalendar = () => {
  const { startDate: initStart, endDate: initEnd, setDates } = useDateStore();
  const [startDate, setStartDate] = useState(
    initStart ? new Date(initStart) : null
  );
  const [endDate, setEndDate] = useState(initEnd ? new Date(initEnd) : null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // date 값 변경 함수
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    setDates({
      startDate: start ? start.toDateString() : null,
      endDate: end ? end.toDateString() : null,
    });
  };

  const isDateInCurrentMonth = (date) => {
    return isWithinInterval(date, {
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth),
    });
  };

  // 선택한 날짜 클래스 추가 함수
  const dayClassName = (date) => {
    if (startDate && isSameDay(date, startDate) && isDateInCurrentMonth(date)) {
      return 'custom-selected';
    }
    if (endDate && isSameDay(date, endDate) && isDateInCurrentMonth(date)) {
      return 'custom-selected';
    }
    return '';
  };

  useEffect(() => {
    setStartDate(initStart ? new Date(initStart) : null);
    setEndDate(initEnd ? new Date(initEnd) : null);
  }, [initStart, initEnd]);

  return (
    <S.CalendarContainer>
      <DatePicker
        locale={ko}
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        onChange={handleDateChange}
        onMonthChange={(date) => setCurrentMonth(date)}
        selectsRange
        inline
        monthsShown={2}
        minDate={startOfDay(new Date())}
        dayClassName={dayClassName}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
          monthDate,
        }) => (
          <CustomHeader
            date={date}
            decreaseMonth={decreaseMonth}
            increaseMonth={increaseMonth}
            prevMonthButtonDisabled={prevMonthButtonDisabled}
            nextMonthButtonDisabled={nextMonthButtonDisabled}
            monthDate={monthDate}
          />
        )}
      />
    </S.CalendarContainer>
  );
};

export default CustomCalendar;
