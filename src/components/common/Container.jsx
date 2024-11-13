import styled from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop) || prop.startsWith('$'),
})`
  width: 12cm;
  height: 12cm;
  margin-top: -4cm;
  background-color: ${(props) => props.bgColor || '#E0E0E0'}; /* 배경 색상 */
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1; /* 가장 앞으로 위치 */
  overflow: hidden; /* 컨테이너를 넘어서는 부분 숨기기 */

  /* 내부 텍스트 스타일 */
  .text-wrapper {
    position: absolute;
    top: calc(1rem + 0.8cm); /* 상단 여백을 1cm 추가 */
    left: calc(1rem + 0.5cm); /* 좌측 여백을 1cm 추가 */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family:
      SF Pro KR,
      SF Pro Display,
      SF Pro Icons,
      Apple Gothic,
      HY Gulim,
      MalgunGothic,
      HY Dotum,
      Lexi Gulim,
      Helvetica Neue,
      Helvetica,
      Arial,
      sans-serif;
  }
  .subtitle {
    font-size: 0.9rem; /* 보조 설명 텍스트 사이즈 */
    margin-bottom: 0.3rem; /* 설명 텍스트와 메인 텍스트 사이의 간격 */
  }

  .main-text {
    font-size: 1.5rem; /* 메인 소개 텍스트 사이즈 (소제목 사이즈와 동일) */
    font-weight: bold; /* 메인 텍스트 강조 */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3); /* 그림자 효과 추가 */
  }
  img {
    width: 100%; /* 이미지 너비 100% */
    height: 100%; /* 이미지 높이 100% */
    object-fit: cover; /* 이미지 비율 유지하며 채우기 */
  }

  &:hover {
    transform: scale(1.02); /* 살짝 커지는 효과 */
  }
`;

export default Container;
