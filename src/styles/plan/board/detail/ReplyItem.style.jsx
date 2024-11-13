import { flex } from '@styles/common/common.style';
import styled from 'styled-components';

export const ReplyItemContainer = styled.div`
  .username {
    font-weight: bold;
    margin-bottom: 10px;
  }

  .tag {
    font-weight: bold;
    color: #3737ff;
    margin-right: 5px;
  }

  .createdAt {
    margin-top: 5px;
    color: #c5c5c5;
  }

  .info {
    ${flex}
    gap: 20px;

    svg {
      cursor: pointer;
      opacity: 0;
      margin-top: 5px;
      font-size: 20px;
      color: #c5c5c5;
      transition: all 0.1s ease-out;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
