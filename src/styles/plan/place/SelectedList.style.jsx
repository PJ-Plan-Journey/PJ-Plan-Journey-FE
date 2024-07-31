import { flex, flexColumn, ScrollStyle } from '@styles/common/common.style';
import styled from 'styled-components';

export const SideBar = styled.div`
  position: absolute;
  ${flexColumn}
  top: 0;
  left: 0;
  height: 100%;
  z-index: -2;
  transition: all 0.2s ease-out;

  &.hide {
    left: 0%;
  }

  &.show {
    left: 100%;
  }
`;

export const SelectedListContainer = styled.div`
  ${flexColumn}
  width: 400px;
  height: 100%;
  background-color: white;
  padding: 40px;
  padding-bottom: 100px;

  .sub-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    padding: 20px 0;

    .select-number {
      font-size: 30px;
      font-weight: bold;
    }

    .init-button {
      cursor: pointer;
      border: 1px solid #959595;
      border-radius: 10px;
      background-color: transparent;
      color: #959595;

      &:hover {
        color: red;
        border: 1px solid red;
      }
    }
  }

  .list {
    ${flexColumn}
    gap: 15px;
    width: 100%;
    height: inherit;
    padding: 30px 5px;
    overflow-y: auto;
    ${ScrollStyle}
  }

  .not-content {
    ${flex}
    justify-content: center;
    height: 100%;
    font-size: 20px;
    font-weight: bold;
  }
`;

export const OpenSeletedBoxButton = styled.button`
  width: 55px;
  height: 55px;
  ${flex}
  justify-content: center;
  cursor: pointer;
  position: absolute;
  bottom: 30px;
  left: 107%;
  z-index: 3;
  background-color: #156bf0;
  border: 3px solid white;
  box-shadow: 0 0 4px black;
  padding: 14px;
  border-radius: 50%;
  transition: transform 0.2s ease-out;
  opacity: 1;

  &:hover {
    transform: scale(1.1);
  }

  &:focus-visible {
    outline: none;
  }

  svg {
    position: relative;
    font-size: 20px;
    color: white;
  }

  .select-number {
    width: 25px;
    height: 25px;
    ${flex};
    justify-content: center;
    position: absolute;
    z-index: 4;
    top: -5px;
    right: -5px;
    padding: 10px;
    color: white;
    font-weight: bold;
    background-color: #ff4a1d;
    border-radius: 50%;
    box-shadow: 0 0 2px #545454;
  }
`;
