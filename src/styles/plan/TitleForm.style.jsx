import { flex } from '@styles/common/common.style';
import styled from 'styled-components';

export const TItleFormStyle = styled.div`
  .info {
    text-align: left;
    color: #888888;
    font-size: 12px;
    padding: 10px;
    word-break: keep-all;
  }

  input {
    width: 100%;
    ${flex}
    justify-content: space-between;
    border: none;
    border: 1px solid #c4c4c4;
    padding: 10px 15px;
    border-radius: 50px;

    &:focus-visible {
      outline: none;
    }
  }
`;
