import useDateStore from '@zustands/plan/useDateStore';
import * as S from '@styles/plan/date/DateRangeDisplay.style';
import { FaCalendar as CalendarIcon } from '@react-icons/all-files/fa/FaCalendar';
import { formatDate } from '@/utils/formatDate';

const DateRangeDisplay = () => {
  const { startDate, endDate } = useDateStore();

  const formatDateToKorean = (date) => {
    return formatDate('yyyy.MM.dd(EE)', date);
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
