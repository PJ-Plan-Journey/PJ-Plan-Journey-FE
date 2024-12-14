import { flex } from '@styles/common/common.style';
import { FaRegEdit } from 'react-icons/fa';
import styled from 'styled-components';

export const Info = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 2px #6c6c6c;

  .city {
    margin-bottom: 10px;
    font-size: 1.3rem;
  }

  .date {
    ${flex}
    gap: 5px;
    color: #6c6c6c;
  }
`;

export const EditDate = styled(FaRegEdit)`
  cursor: pointer;
`;
