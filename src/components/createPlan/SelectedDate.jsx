import { flexColumn } from '@styles/common.style';
import styled from 'styled-components';
import { MdOutlineEditCalendar } from 'react-icons/md';
import Portal from '@/utils/Portal';
import CalendarModal from '@components/createPlan/CalendarModal';
import { useState } from 'react';
import useDateStore from '@zustand/useDateStore';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const Container = styled.div`
  ${flexColumn}
  gap: 30px;
  width: 800px;
  height: 100%;
  padding: 60px 0;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 30px;
`;

const CalendarIcon = styled(MdOutlineEditCalendar)`
  cursor: pointer;
  font-size: 30px;
`;

const SelectedDateBox = styled.div`
  ${flexColumn}
  gap: 20px;
  font-size: 26px;
  font-weight: bold;
`;

const SelectedDate = () => {
  const { startDate, endDate } = useDateStore();
  const [isvisible, setIsvisible] = useState(!!!startDate || !!!endDate);

  const formatDateToKorean = (date) => {
    return date ? format(date, 'yyyy.MM.dd(EE)', { locale: ko }) : null;
  };

  const toggle = () => {
    if (!startDate || !endDate) {
      return alert('일정을 선택해주세요.');
    }
    setIsvisible((prev) => !prev);
  };

  return (
    <Container>
      <Title>카드선택이름</Title>

      <div>
        <CalendarIcon onClick={toggle} />
        <p>변경</p>
      </div>

      <SelectedDateBox>
        <div>
          {formatDateToKorean(startDate)} - {formatDateToKorean(endDate)}
        </div>
      </SelectedDateBox>
      <Portal>{isvisible && <CalendarModal toggle={toggle} />}</Portal>
    </Container>
  );
};

export default SelectedDate;
