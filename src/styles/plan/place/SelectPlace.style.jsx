import styled from 'styled-components';
import { flex, flexColumn, ScrollStyle } from '@styles/common/common.style';

export const SearchBox = styled.div`
  width: 90%;
  margin: 0 auto;
  ${flex}
  gap: 8px;
  justify-content: space-between;
  padding: 8px 10px;
  border: 1px solid rgb(196, 196, 196);
  border-radius: 12px;
  background-color: white;

  svg {
    color: rgb(136, 136, 136);
    font-size: 18px;
  }

  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 14px;
    background-color: inherit;
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
  min-width: 320px;
  height: 400px;
  overflow-y: auto;
  background-color: white;
  ${ScrollStyle}
  margin: 20px 0;

  .not-result {
    ${flex}
    justify-content: center;
    height: 100%;
    color: #8b8b8b;
  }
`;

export const SearchItem = styled.li`
  cursor: pointer;
  width: 100%;
  ${flex}
  justify-content: space-between;
  padding: 12px 20px;
  gap: 18px;
  text-align: left;

  .place-name {
    margin-bottom: 3px;
    font-weight: bold;
  }

  .item {
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .place-address {
    font-size: 10px;
    color: #a5a5a5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    background-color: #f3f3f3;
  }

  & + & {
    border-top: 1px solid #d1d1d1;
  }

  &.add {
    background-color: #156bf0;
    color: white;

    .place-address {
      font-size: 10px;
      color: #efefef;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;
