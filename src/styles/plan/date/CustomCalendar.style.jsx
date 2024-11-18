import { ScrollStyle } from '@styles/common/common.style';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
`;

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  background-color: initial;
  font-size: 1.2rem;
  ${ScrollStyle}
`;

export const Calendar = styled.div`
  text-align: center;

  .header {
    padding: 30px 0;
  }

  .week {
    padding: 20px 30px;
    color: #7e7e7e;
  }
`;

export const Day = styled.td`
  .day {
    padding: 10px;
    cursor: pointer;

    &:hover {
      background-color: #ddd;
    }

    &.weekend {
      color: #ff7171;
    }

    &.today {
      color: #156bf0;
    }

    &.highlight {
      background-color: #156bf0;
      color: #fff;
    }

    &.start-date {
      border-radius: ${({ $startDate, $endDate }) =>
        $startDate?.getTime() === $endDate?.getTime()
          ? '5vw'
          : $endDate
            ? '5vw 0 0 5vw'
            : '5vw'};
    }

    &.end-date {
      border-radius: ${({ $startDate, $endDate }) =>
        $startDate?.getTime() === $endDate?.getTime()
          ? '5vw'
          : $startDate
            ? '0 5vw 5vw 0'
            : '5vw'};
    }

    &.start-date,
    &.end-date {
      background-color: #156bf0;
      color: #fff;
    }

    &.past-date {
      color: #9c9c9c;
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  .text {
    min-height: 30px;
    font-size: 10px;
    color: #156bf0;
    padding: 10px;
  }
`;

export const Control = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px;
  box-shadow: 0 0 2px #9b9b9b;

  select {
    padding: 12px 15px;
    border-radius: 15px;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .title {
    font-weight: bold;
    margin-bottom: 10px;
  }

  .info {
    font-size: 0.7rem;
    color: #7b7b7b;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 20px;
  }

  .control-button button + button {
    margin-top: 20px;
  }
`;
