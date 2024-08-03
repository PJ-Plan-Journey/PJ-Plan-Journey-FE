import { flex, flexColumn } from '@styles/common/common.style';
import styled from 'styled-components';

export const CalendarModalContainer = styled.div`
  width: inherit;
  height: inherit;

  .background {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 6;
  transform: translate(-50%, -50%);
  ${flexColumn};
  justify-content: space-between;
  background-color: white;
  padding: 40px;
  border-radius: 20px;
  font-weight: bold;

  h1 {
    font-size: 25px;
    padding-bottom: 30px;
  }
`;

export const ButtonGroup = styled.div`
  width: 100%;
  margin-top: 30px;
  ${flex}
  justify-content: right;
  gap: 20px;

  button {
    cursor: pointer;
    width: 100px;
    border: none;
    background-color: #156bf0;
    color: white;
    ${flex};
    justify-content: center;
    padding: 10px 0;
    border-radius: 30px;
    font-size: 1rem;

    &.cancel {
      background-color: #c2c2c2;
    }
  }
`;
