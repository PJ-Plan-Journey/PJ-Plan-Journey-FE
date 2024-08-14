import { flexColumn } from '@styles/common/common.style';
import styled from 'styled-components';

export const DayListContainer = styled.div`
  min-width: 180px;
  height: 100%;
  ${flexColumn};
  justify-content: space-between;
  padding: 20px;
  background-color: white;
  border-right: 1px solid #d9d9d9;

  .day-list {
    width: 100%;
    ${flexColumn};
    gap: 10px;
  }

  .day {
    width: 100%;
    padding: 20px 40px;
    box-shadow: 0 0 1px black;
    border-radius: 10px;
    text-align: center;
  }

  .button-group {
    width: 100%;
    ${flexColumn};
    gap: 10px;

    button {
      cursor: pointer;
      width: 100%;
      border: none;
      padding: 15px;
      border: 1px solid #ccc;
      border-radius: 10px;
      background-color: white;
    }
  }
`;
