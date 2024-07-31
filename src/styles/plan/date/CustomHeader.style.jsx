import { flex } from '@styles/common/common.style';
import styled from 'styled-components';

export const CustomHeaderContainer = styled.div`
  ${flex}
  justify-content: center;
  gap: 30px;
  padding: 0 10px;
  background-color: #156bf0;
  color: white;
  font-size: 16px;

  button {
    ${flex}
    background: none;
    border: none;
    color: white;
    font-size: 30px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(1.15);
    }
  }

  span {
    font-weight: bold;
  }
`;
