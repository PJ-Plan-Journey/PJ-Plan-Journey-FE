import { flex } from '@styles/common/common.style';
import styled from 'styled-components';

export const CommentContainer = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px solid #b7b7b7;
  border-radius: 10px;

  .username {
    font-weight: bold;
    margin-right: 10px;
  }

  .sub {
    ${flex};
    gap: 10px;
    padding: 10px 0;
  }
`;
