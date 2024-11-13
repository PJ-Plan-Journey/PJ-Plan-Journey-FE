import Portal from '@/utils/Portal';
import CalendarModal from '@components/plan/date/CalendarModal';
import { useState } from 'react';
import DateRangeDisplay from '@components/plan/date/DateRangeDisplay';
import * as S from '@styles/plan/date/SelectedDate.style';
import useDateStore from '@zustands/plan/useDateStore';
import { formatDate } from '@/utils/formatDate';
import Button from '@components/common/Button';

const SelectedDate = () => {
  const { startDate, endDate } = useDateStore();
  const [isvisible, setIsvisible] = useState(!!!startDate || !!!endDate);

  const openCalendar = () => {
    setIsvisible(true);
  };

  const closeCalendar = () => {
    setIsvisible(false);
  };

  const formatDateToKorean = (date) => {
    return formatDate('yyyyMMdd', date);
  };

  const onClickTicketing = () => {
    const origin = 'SEL'; // 출발지 (IATA 코드)
    const destination = 'PUS'; // 도착지 (IATA 코드)
    const formattedStartDate = formatDateToKorean(startDate);
    const formattedEndDate = formatDateToKorean(endDate);
    const naverFlightsUrl = `https://flight.naver.com/flights/domestic/${origin}-${destination}-${formattedStartDate}/${destination}-${origin}-${formattedEndDate}?adult=1&fareType=YC`;

    // 새 창 또는 탭으로 URL 열기
    window.open(naverFlightsUrl, '_blank');
  };

  return (
    <S.SelectedDateContainer>
      <DateRangeDisplay />
      <div className="button-group">
        <Button onClick={openCalendar}>
          일정 변경
        </Button>
        <Button onClick={onClickTicketing} variant='outline'>
          항공권 알아보기
        </Button>
      </div>

      <Portal>
        {isvisible && <CalendarModal closeCalendar={closeCalendar} />}
      </Portal>
    </S.SelectedDateContainer>
  );
};

export default SelectedDate;
