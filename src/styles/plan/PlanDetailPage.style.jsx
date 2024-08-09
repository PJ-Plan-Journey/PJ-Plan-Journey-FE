import { flex } from '@styles/common/common.style';
import styled from 'styled-components';

export const PlanDetailPageContainer = styled.div`
  ${flex};
  height: 100%;

  .resize-container {
    height: 100%;
    ${flex};
    z-index: 2;
  }

  .width-size-button {
    ${flex}
    justify-content: center;
    cursor: ew-resize;
    padding: 0 5px;
    background-color: #ffffff;
    box-shadow: 0 0 3px #9e9e9e;
    height: 100%;

    svg {
      color: #1c03ff;
      font-size: 24px;
    }
  }

  // 드래그 막기
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;
