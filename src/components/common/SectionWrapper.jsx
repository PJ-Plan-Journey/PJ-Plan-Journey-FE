import styled from 'styled-components';

const SectionWrapper = styled.div`
  width: calc(100% - 4cm); /* 왼쪽 마진 3cm 적용 */
  margin-left: 3cm;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
  transition: transform 2.5s ease; /* 부드러운 전환 효과 추가 */

  & > * {
    margin-bottom: 0.8cm; /* 각 자식 요소 간의 간격 조절 */
  }

  & > *:last-child {
    margin-bottom: 0; /* 마지막 요소는 마진을 제거 */
  }
`;

export default SectionWrapper;
