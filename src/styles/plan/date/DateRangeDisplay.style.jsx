import styled from 'styled-components';
import { flex, flexColumn } from '@styles/common/common.style';

export const DateRangeDisplayContainer = styled.div`
  width: 100%;
  ${flexColumn}
  gap: 30px;
  padding: 20px 0;
  border-bottom: 1px solid #cbcbcb;

  .city {
    font-weight: bold;
    font-size: 30px;
  }

  .dateRange {
    width: 100%;
    ${flex}
    justify-content: center;
    gap: 10px;
    font-size: 20px;
    font-weight: bold;
  }
`;
