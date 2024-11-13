import { flexColumn } from '@styles/common/common.style';
import styled from 'styled-components';

export const CalendarContainer = styled.div`
  --date-size: 3rem;

  ${flexColumn}
  width: 100%;

  .react-datepicker {
    display: flex;
    gap: 20px;
    border: none;
    border-radius: 20px;
  }

  .react-datepicker__month-container {
    float: none !important;
  }

  .react-datepicker__header {
    background-color: #156bf0;
    padding: 20px 20px 10px;
    border-radius: 30px 30px 5px 5px;
  }

  .react-datepicker__navigation {
    top: -40px;
  }

  .react-datepicker__current-month {
    color: white;
    margin-bottom: 20px;
  }

  .react-datepicker__day-name {
    width: var(--date-size);
    line-height: var(--date-size);
    font-size: 18px;
    color: white;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: white;
  }

  .custom-selected {
    background-color: #d0e5ff;
    color: #156bf0;
  }

  .react-datepicker__day--in-range {
    background-color: #d0e5ff;
    color: #156bf0;
    font-weight: bold;
  }

  .react-datepicker__day--today {
    font-weight: bold;
    color: #156bf0;
  }

  .react-datepicker__day {
    font-size: 18px;
    width: var(--date-size);
    line-height: var(--date-size);
  }

  .react-datepicker__day--outside-month {
    visibility: hidden;
  }
`;
