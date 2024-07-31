import styled from 'styled-components';
import { flex, flexColumn } from '@styles/common/common.style';

export const BackGround = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 5;
`;

export const ModalStyle = styled.div`
  ${flexColumn}
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 3px #7f7f7f;
  border-radius: 10px;

  .message {
    padding: 50px;
    font-weight: bold;
  }

  .group {
    width: 100%;
    ${flex}
    gap: 10px;
    justify-content: center;
  }

  button {
    width: 100px;
    cursor: pointer;
    ${flex}
    justify-content: center;
    padding: 10px 30px;
    border: none;
    border-radius: 10px;

    &.confirm {
      background-color: #156bf0;
      color: white;
    }
  }
`;
