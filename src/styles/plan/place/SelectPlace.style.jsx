import styled from 'styled-components';
import { flex, flexColumn, ScrollStyle } from '@styles/common/common.style';

export const SelectPlaceContainer = styled.div`
  ${flex}
  height: 100%;
  gap: 30px;
  position: relative;
  z-index: 3;

  .search-box {
    ${flexColumn}
    width: 400px;
    height: inherit;
    padding: 50px 30px;
    background-color: white;
    border-right: 1px solid #d4d4d4;

    ul {
      width: 100%;
      ${flexColumn}
    }
  }

  .result {
    width: 100%;
    color: #a2a2a2;
    padding: 10px 20px;
    font-size: 12px;
    border-bottom: 1px solid #d4d4d4;
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
    transition: all 0.2s ease-out;

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
  }

  .place-address {
    font-size: 13px;
    color: #a5a5a5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
