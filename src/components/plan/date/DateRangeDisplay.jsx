import { flexColumn } from '@styles/common/common.style';
import useDateStore from '@/zustands/plan/useDateStore';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import React from 'react';
import styled from 'styled-components';

const SelectedDateBox = styled.div`
  ${flexColumn}
  gap: 20px;
  font-size: 26px;
  font-weight: bold;
`;

const DateRangeDisplay = () => {
  const { startDate, endDate } = useDateStore();

  const formatDateToKorean = (date) => {
    return date ? format(date, 'yyyy.MM.dd(EE)', { locale: ko }) : null;
  };

  return (
    <SelectedDateBox>
      {formatDateToKorean(startDate)} - {formatDateToKorean(endDate)}
    </SelectedDateBox>
  );
};

export default DateRangeDisplay;
