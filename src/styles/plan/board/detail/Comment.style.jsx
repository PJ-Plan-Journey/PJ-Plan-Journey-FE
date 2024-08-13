import { flex, flexColumn } from '@styles/common/common.style';
import styled from 'styled-components';

export const CommentContainer = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px solid #b7b7b7;
  border-radius: 10px;
  font-size: 14px;

  .username {
    font-weight: bold;
    margin-bottom: 10px;
  }

  .sub {
    ${flex};
    gap: 10px;
    padding: 10px 0;
    color: #959595;
    font-size: 13px;

    button {
      cursor: pointer;
      border: none;
      background: transparent;
      color: #959595;
    }
  }

  .reply-button {
    cursor: pointer;
    border: none;
    background: transparent;
    color: #959595;
  }

  .reply-list {
    width: 100%;
    height: 100%;
    ${flexColumn};
    align-items: flex-start;
    margin-top: 10px;
    margin-left: 20px;
  }
`;
