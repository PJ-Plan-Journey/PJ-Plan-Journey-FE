import useDateStore from '@zustands/plan/useDateStore';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import * as S from '@styles/plan/date/DateRangeDisplay.style';

import { MdCalendarToday as CalendarIcon } from 'react-icons/md';

const DateRangeDisplay = () => {
  const { startDate, endDate } = useDateStore();

  const formatDateToKorean = (date) => {
    return date ? format(date, 'yyyy.MM.dd(EE)', { locale: ko }) : null;
  };

  return (
    <S.DateRangeDisplayContainer>
      <div className="city">서울</div>
      <div className="dateRange">
        {startDate ? formatDateToKorean(startDate) : <CalendarIcon />}
        <span>-</span>
        {endDate ? formatDateToKorean(endDate) : <CalendarIcon />}
      </div>
    </S.DateRangeDisplayContainer>
  );
};

export default DateRangeDisplay;
