import { flexColumn } from '@styles/common/common.style';

export const DayListContainer = styled.div`
  min-width: 180px;
  height: 100%;
  ${flexColumn};
  justify-content: space-between;
  padding: 20px;

  .day-list {
    ${flexColumn};
    gap: 10px;
  }

  .day {
    width: 100%;
    padding: 20px 40px;
    box-shadow: 0 0 1px black;
    border-radius: 10px;
  }

  .button-group {
    ${flexColumn};
    gap: 10px;
  }
`;
