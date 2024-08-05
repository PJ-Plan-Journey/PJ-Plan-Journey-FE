import { flexColumn } from '@styles/common/common.style';
import styled from 'styled-components';

export const SelectedDateContainer = styled.div`
  ${flexColumn}
  gap: 20px;
  width: 100%;
  min-width: 400px;
  height: 100%;
  padding: 80px 40px;
  background-color: white;
  border-right: 1px solid #d4d4d4;

  button {
    cursor: pointer;
    width: 100%;
    background-color: #ffffff;
    color: #156bf0;
    border: none;
    border-radius: 20px;
    box-shadow: 0 0 3px #979797;
    padding: 15px;
    font-size: 17px;
    font-weight: bold;
    font-family: 'Nanum Gothic', sans-serif;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f8f8f8;
    }
  }

  .button-group {
    width: 100%;
    margin-top: 50px;
    ${flexColumn}
    gap: 20px;
  }

  .date {
    background-color: #156bf0;
    color: white;

    &:hover {
      background-color: #0058dd;
    }
  }
`;
