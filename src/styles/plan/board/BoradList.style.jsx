import { flex } from '@styles/common/common.style';
import styled from 'styled-components';

export const BoradListContainer = styled.div`
  width: 100%;

  .board-list {
    ${flex}
    flex-wrap: wrap;
    gap: 10px;
  }
`;
