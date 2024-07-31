import styled, { css } from 'styled-components';
import { flex, flexColumn } from '../common/common.style';
import logo from '@assets/PJ_logo.png';

export const Container = styled.div`
  min-width: 150px;
  height: 100%;
  ${flexColumn};
  justify-content: space-between;
  padding: 20px;
  background-color: white;
  border-right: 1px solid #ccc;
`;

export const Logo = styled.h1`
  cursor: pointer;
  width: 100%;
  height: 100px;
  background-repeat: no-repeat;
  background-image: url(${logo});
  background-size: contain;
  background-position: 50% 50%;
  opacity: 0.7;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

export const StepList = styled.ol`
  width: 100%;
  ${flexColumn}
  justify-content: center;
  gap: 100px;
`;

export const Item = styled.li`
  min-height: 50px;
  cursor: pointer;
  ${flexColumn}
  justify-content: center;
  gap: 10px;
  text-align: center;
  text-transform: uppercase;
  color: ${({ $status }) => ($status === 'true' ? '#156bf0' : 'gray')};
  font-weight: bold;

  transform: ${({ $status }) =>
    $status === 'true' ? 'scale(1.1)' : 'scale(1)'};
  transition: all 0.2s ease-out;

  .step-number {
    ${({ $status }) =>
      $status === 'true'
        ? css`
            box-shadow: 0 0 2px #156bf0;
          `
        : css`
            box-shadow: 0 0 2px black;
          `};

    ${flex}
    padding: 10px;
    border-radius: 30px;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  width: 100%;
  border: none;
  background-color: #156bf0;
  color: white;
  ${flex};
  justify-content: center;
  padding: 10px 0;
  border-radius: 30px;
  font-size: 18px;
`;
