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
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #dedede;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;