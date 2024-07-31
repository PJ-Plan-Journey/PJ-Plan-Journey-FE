import { flex } from '@styles/common/common.style';
import styled from 'styled-components';

export const PlaceItem = styled.div`
  ${flex}
  gap: 10px;
  width: 100%;

  .array-number {
    --marker-size: 35px;
    ${flex}
    justify-content: center;
    min-width: var(--marker-size);
    height: var(--marker-size);
    border: 3px solid white;
    border-radius: 50%;
    background: #156bf0;
    color: white;
    font-weight: bold;
    box-shadow: 0 0 2px 1px gray;
  }
`;

export const Item = styled.li`
  ${flex}
  justify-content: space-between;
  width: 100%;
  min-height: 50px;
  padding: 10px;
  box-shadow: 0 0 3px #828282;
  border-radius: 10px;
  background-color: ${({ $isDragging }) =>
    $isDragging === 'true' ? '#0066ff' : 'white'};
  color: ${({ $isDragging }) => ($isDragging === 'true' ? 'white' : 'black')};

  button {
    ${flex}
    justify-content: center;
    cursor: pointer;
    border: none;
    background-color: transparent;
    font-size: 20px;
  }

  svg {
    color: ${({ $isDragging }) =>
      $isDragging === 'true' ? 'white' : '#9c9c9c'};
  }

  .title {
    width: 150px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .content {
    ${flex}
    gap: 5px;
  }

  .remove {
    ${flex}
    justify-content: center;
    cursor: pointer;
    padding: 5px;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 2px #9c9c9c;
    transition: all 0.2s ease-out;

    &:hover {
      background-color: #dadada;

      svg {
        color: white;
      }
    }
  }
`;
