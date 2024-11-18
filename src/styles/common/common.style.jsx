import { css } from 'styled-components';

export const flex = css`
  display: flex;
  align-items: center;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ScrollStyle = css`
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d0d0d0;
    border-radius: 2px;
    cursor: pointer;
  }

  &::-webkit-scrollbar-track {
    background-color: initial;
    border-radius: 10px;
  }
`;
