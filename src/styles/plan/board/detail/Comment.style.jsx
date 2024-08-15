import { flex, flexColumn } from '@styles/common/common.style';
import styled from 'styled-components';

export const CommentContainer = styled.div`
  width: 100%;
  font-size: 14px;
  padding: 20px;
  border-bottom: 1px solid #ccc;

  .username {
    ${flex}
    justify-content: space-between;
    gap: 5px;
    font-weight: bold;
    margin-bottom: 10px;

    svg {
      font-size: 24px;
      color: #ccc;
      cursor: pointer;
    }
  }

  .button {
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: white;
    padding: 5px 10px;
  }

  .sub {
    ${flex};
    gap: 20px;
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

  .info {
    position: relative;

    svg {
      cursor: pointer;
      color: #ccc;
      font-size: 20px;
      margin-top: 2px;
    }
  }

  .info-box {
    width: 100px;
    position: absolute;
    top: -13px;
    left: 30px;
    ${flexColumn}
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: white;
    text-align: center;
    overflow: hidden;
    padding: 10px 0;

    div {
      cursor: pointer;
      width: 100%;
      padding: 8px 10px;
      font-size: 12px;

      &:hover {
        background-color: #e6e6e6;
      }
    }
  }

  input {
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: white;
    padding: 5px;
  }
`;
