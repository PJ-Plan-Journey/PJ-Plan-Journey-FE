import { flex } from '@styles/common/common.style';
import styled from 'styled-components';

export const PlaceItem = styled.div`
  ${flex}
  gap: 10px;
  width: 100%;
  transition: all 0.2s ease-in;

  button {
    width: auto;
    ${flex}
    justify-content: center;
    cursor: pointer;
    border: none;
    background-color: transparent;
    font-size: 16px;
  }

  svg {
    color: ${({ $isDragging }) =>
      $isDragging === 'true' ? 'white' : '#9c9c9c'};
  }

  .array-number {
    --marker-size: 25px;
    ${flex}
    justify-content: center;
    min-width: var(--marker-size);
    height: var(--marker-size);
    border: none;
    border-radius: 50%;
    background: ${({ $color }) => $color};
    color: white;
    font-weight: bold;
    font-size: 12px;
  }

  .remove {
    ${flex}
    justify-content: center;
    cursor: pointer;
    border: none;
    padding: 0;
    transition: all 0.2s ease-out;
    color: #9d9d9d;
  }

  .drag {
    color: #9d9d9d;
    padding: 0;
    cursor: move;
  }
`;

export const Item = styled.li`
  ${flex}
  justify-content: space-between;
  width: 100%;
  box-shadow: 0 0 2px 1px #cfcfcf;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ $isDragging }) =>
    $isDragging === 'true' ? '#0066ff' : 'white'};
  color: ${({ $isDragging }) => ($isDragging === 'true' ? 'white' : 'black')};

  .title {
    width: 150px;
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 8px;
  }

  .address {
    color: #656565;
    font-size: 0.6rem;
  }

  .content {
    ${flex}
    gap: 10px;
  }
`;
