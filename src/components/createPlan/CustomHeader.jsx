import React from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import styled from 'styled-components';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';
import { flex } from '@styles/common.style';

const Container = styled.div`
  ${flex}
  justify-content: center;
  gap: 30px;
  padding: 0 10px;
  background-color: #156bf0;
  color: white;
  font-size: 20px;

  button {
    ${flex}
    background: none;
    border: none;
    color: white;
    font-size: 40px;
    cursor: pointer;
    transition: all 0.3s ease-out;

    &:hover {
      transform: scale(1.2);
    }
  }

  span {
    font-weight: bold;
  }
`;

const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  monthDate,
}) => {
  return (
    <Container>
      <button
        type="button"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      >
        <IoIosArrowDropleftCircle />
      </button>
      <span>{format(monthDate, 'yyyy년 MMMM', { locale: ko })}</span>
      <button
        type="button"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      >
        <IoIosArrowDroprightCircle />
      </button>
    </Container>
  );
};

export default CustomHeader;
