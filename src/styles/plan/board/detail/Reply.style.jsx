import { flexColumn } from '@styles/common/common.style';
import styled from 'styled-components';

export const ReplyContainer = styled.div`
  width: 100%;

  .reply-list {
    ${flexColumn}
    gap: 15px;
    align-items: flex-start;
  }

  .reply-content {
    ${flexColumn}
    align-items: flex-start;
  }
`;
