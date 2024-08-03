import styled from 'styled-components';
import { flex } from '@styles/common/common.style';

export const KakaoContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;

  .map {
    width: 100%;
    height: 100%;
  }
`;

export const CustomMarker = styled.div`
  --marker-size: 40px;
  ${flex}
  justify-content: center;
  width: var(--marker-size);
  height: var(--marker-size);
  border: 3px solid white;
  border-radius: 50%;
  background: #156bf0;
  color: white;
  font-weight: bold;
  box-shadow: 0 0 3px 1px gray;
`;
