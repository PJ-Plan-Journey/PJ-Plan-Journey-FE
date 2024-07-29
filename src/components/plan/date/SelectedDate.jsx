import { flexColumn } from '@styles/common/common.style';
import styled from 'styled-components';
import { MdOutlineEditCalendar } from 'react-icons/md';
import Portal from '@/utils/Portal';
import CalendarModal from '@components/plan/date/CalendarModal';
import { useState } from 'react';
import useDateStore from '@zustand/plan/useDateStore';
import DateRangeDisplay from './DateRangeDisplay';

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
const SelectedDate = () => {
  const { startDate, endDate } = useDateStore();
  const [isvisible, setIsvisible] = useState(!!!startDate || !!!endDate);

  const toggle = () => {
    if (!startDate || !endDate) {
      return alert('일정을 선택해주세요.');
    }
    setIsvisible((prev) => !prev);
  };

  return (
    <Container>
      <Title>서울</Title>

      <div>
        <CalendarIcon onClick={toggle} />
        <p>변경</p>
      </div>

      <DateRangeDisplay />
      <Portal>{isvisible && <CalendarModal toggle={toggle} />}</Portal>
    </Container>
  );
};

export default SelectedDate;
