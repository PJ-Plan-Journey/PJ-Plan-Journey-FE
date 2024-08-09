import { flex, flexColumn } from '@styles/common/common.style';
import styled from 'styled-components';

export const BoardItemContainer = styled.div`
  width: 400px;
  ${flex}
  gap: 3px;
`;

export const BoardMain = styled.div`
  width: 100%;
  ${flexColumn}
  align-items: flex-start;
  gap: 10px;
  height: 100%;
  box-shadow: 0 0 2px black;
  border: 4px solid white;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;

  .header {
    width: 100%;
    ${flex}
    padding: 10px 20px;
  }

  .title {
    padding: 10px 20px;
    font-size: 20px;
    font-weight: bold;
  }

  .board-id {
    font-weight: bold;
    font-size: 20px;
  }

  .board-info {
    ${flex}
    gap: 10px;
    font-size: 14px;
    color: #636363;

    span {
      font-weight: bold;
    }

    span + span::before {
      content: '|';
      padding: 4px;
    }
  }

  .city {
    padding: 20px 0;
    font-size: 30px;
    font-weight: bold;
    color: #2c2cff;
  }

  .content {
    padding: 0 20px;
  }

  .board-stats {
    ${flex}
    gap: 10px;
    padding: 20px;
  }
`;
