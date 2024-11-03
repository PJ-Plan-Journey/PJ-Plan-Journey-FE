import { flexColumn } from '@styles/common/common.style';
import styled from 'styled-components';

export const SelectedDateContainer = styled.div`
  ${flexColumn}
  gap: 20px;
  width: 100%;
  min-width: 400px;
  height: 100%;
  padding: 80px 40px;
  background-color: white;
  border-right: 1px solid #d4d4d4;

  .button-group {
    width: 100%;
    margin-top: 50px;
    ${flexColumn}
    gap: 20px;
  }
`;
