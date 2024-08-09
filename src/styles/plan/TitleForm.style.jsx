import { flex, flexColumn } from '@styles/common/common.style';
import styled from 'styled-components';

export const TItleFormContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.4);

  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 6;
    transform: translate(-50%, -50%);
    width: 400px;
    padding: 30px;
    background-color: white;
    border-radius: 20px;
    ${flexColumn}
    gap: 20px;
  }

  .button-group {
    width: 100%;
    ${flex}
    justify-content: center;
    gap: 10px;

    button {
      cursor: pointer;
      width: 100%;
      border: none;
      background-color: #156bf0;
      color: white;
      ${flex};
      justify-content: center;
      padding: 10px 0;
      border-radius: 10px;
      font-size: 18px;

      &.cancel {
        background-color: #b7b7b7;
        color: white;
      }
    }
  }

  .info {
    ${flex}
    gap: 5px;
    color: #b0b0b0;
    font-size: 12px;
    margin-bottom: 30px;
  }

  h1 {
    font-size: 20px;
    margin-top: 30px;
  }

  input {
    width: 90%;
    ${flex}
    justify-content: space-between;
    border: none;
    box-shadow: 0 0 2px 1px #c4c4c4;
    padding: 10px 15px;
    border-radius: 50px;
  }
`;
