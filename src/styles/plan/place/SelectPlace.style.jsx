import styled, { css } from 'styled-components';
import { flex, flexColumn, ScrollStyle } from '@styles/common/common.style';

export const SelectPlaceContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 6;
  background-color: rgba(0, 0, 0, 0.5);

  .search-box {
    ${flexColumn}
    width: 400px;
    height: 600px;
    z-index: 7;
    padding: 50px 30px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 0 5px #6f6f6f;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    ul {
      width: 100%;
      height: 100%;
      ${flexColumn}
      border-bottom: 1px solid #d4d4d4;
    }
  }

  .result {
    width: 100%;
    color: #a2a2a2;
    padding: 10px 20px;
    font-size: 12px;
    border-bottom: 1px solid #d4d4d4;
  }

  .complete {
    margin-top: 20px;
    text-align: center;
    cursor: pointer;
    width: 100%;
    background-color: white;
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
      background-color: #156bf0;
      color: white;
    }
  }
`;

export const SearchBox = styled.div`
  width: 100%;
  ${flex}
  justify-content: space-between;
  box-shadow: 0 0 2px 1px #c4c4c4;
  padding: 10px 15px;
  border-radius: 50px;
  margin-top: 30px;

  svg {
    font-size: 20px;
    color: #5f5f5f;
  }

  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    margin-left: 5px;
  }

  button {
    ${flex}
    justify-content: center;
    background-color: white;
    border: none;
    padding: 0;
  }

  .close {
    cursor: pointer;
    color: #b4b4b4;

    &:hover {
      color: #156bf0;
    }
  }

  &:focus-within {
    border-color: #156bf0;
  }
`;

export const SearchList = styled.ul`
  ${flexColumn}
  width: 100%;
  overflow-y: auto;
  ${ScrollStyle}

  .not-result {
    ${flex}
    justify-content: center;
    height: 100%;
    color: #8b8b8b;
  }
`;

export const SearchItem = styled.li`
  width: 100%;
  ${flex}
  justify-content: space-between;
  padding: 20px;

  button {
    ${flex}
    justify-content: center;
    cursor: pointer;
    padding: 10px;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 2px #9c9c9c;

    &.check {
      background-color: #156bf0;
      color: white;
    }

    &.add {
      background-color: #ffffff;
      color: #898989;
    }

    &:hover {
      background-color: #156bf0;
      color: white;
    }
  }

  .place-name {
    margin-bottom: 12px;
    font-weight: bold;
  }

  .item {
    width: 100%;
    height: 100%;
  }

  .place-address {
    font-size: 13px;
    color: #a5a5a5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
