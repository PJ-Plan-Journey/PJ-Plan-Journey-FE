import { flex, flexColumn, ScrollStyle } from '@styles/common/common.style';
import styled from 'styled-components';

export const CommentListContainer = styled.div`
  width: 400px;
  height: 100%;
  background-color: white;
  ${flexColumn}

  .comment-box {
    width: 100%;
    height: 100%;
    ${flexColumn}
    gap: 10px;
    overflow: auto;
    ${ScrollStyle}
  }

  .comment-list {
    width: 100%;
  }

  .comment-form {
    ${flex}
    gap: 10px;
    width: 100%;
    padding: 20px;
    border-top: 1px solid #ccc;

    input {
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid #ccc;
    }

    button {
      cursor: pointer;
      width: 100px;
      height: 100%;
      padding: 5px 12px;
      border-radius: 10px;
      border: 1px solid #ccc;
    }
  }

  .fetch-button {
    cursor: pointer;
    border: none;
    background-color: transparent;
    font-size: 30px;
    color: #c3c3c3;

    &:hover {
      color: #2160ff;
    }
  }

  .fetch-box {
    width: 100%;
    ${flex}
    justify-content: center;
    padding: 20px 0;
  }
`;
