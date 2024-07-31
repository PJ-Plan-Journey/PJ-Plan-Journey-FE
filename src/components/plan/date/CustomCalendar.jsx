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
import useDateStore from '@zustands/plan/useDateStore';
import CustomHeader from '@components/plan/date/CustomHeader';
import * as S from '@styles/plan/date/CustomCalendar.style';

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
        locale={ko} // 한글 로케일 설정
        selected={startDate} // 선택된 시작 날짜
        startDate={startDate} // 날짜 범위 선택 시 시작 날짜
        endDate={endDate} // 날짜 범위 선택 시 종료 날짜
        onChange={handleDateChange} // 날짜 변경 시 호출되는 함수
        onMonthChange={(date) => setCurrentMonth(date)} // 달 변경 시 호출되는 함수
        selectsRange // 날짜 범위를 선택할 수 있도록 설정
        inline // 인라인으로 캘린더를 표시
        monthsShown={2} // 동시에 표시할 달의 수
        minDate={startOfDay(new Date())} // 선택 가능한 최소 날짜 (오늘의 시작)
        dayClassName={dayClassName} // 각 날짜에 클래스명을 추가하는 함수
        renderCustomHeader={({
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
          monthDate,
        }) => (
          <CustomHeader
            decreaseMonth={decreaseMonth} // 이전 달로 이동하는 함수
            increaseMonth={increaseMonth} // 다음 달로 이동하는 함수
            prevMonthButtonDisabled={prevMonthButtonDisabled} // 이전 달 버튼 비활성화 여부
            nextMonthButtonDisabled={nextMonthButtonDisabled} // 다음 달 버튼 비활성화 여부
            monthDate={monthDate} // 현재 표시된 달의 날짜
          />
        )}
      />
    </S.CalendarContainer>
  );
};

export default CustomCalendar;
