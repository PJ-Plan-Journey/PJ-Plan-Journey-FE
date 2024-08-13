import { flex, flexColumn } from '@styles/common/common.style';
import styled from 'styled-components';

export const CommentListContainer = styled.div`
  width: 400px;
  height: 100%;
  border: 1px solid black;
  background-color: white;
  ${flexColumn}

  .comment-list {
    width: 100%;
    height: 100%;
    ${flexColumn}
    gap: 10px;
    padding: 20px;
    overflow: auto;
  }

  .comment-form {
    ${flex}
    gap: 10px;
    width: 100%;
    padding: 20px;

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
`;
