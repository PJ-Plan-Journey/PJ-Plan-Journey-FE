import styled from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

export const SectionWrapper = styled.div`
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

export const HeaderText = styled.h1`
  font-size: 2.5rem; /* 제목 폰트 사이즈 */
  color: black;
  text-align: left; /* 왼쪽 정렬 */
  font-weight: bold;
  line-height: 1.3;
`;

export const LoginText = styled.h1`
  font-size: 1.9rem; /* 제목 폰트 사이즈 */
  text-align: left; /* 왼쪽 정렬 */
  font-weight: bold;
  margin-top: auto;
  line-height: 1.4;
  margin-right: 8.1rem;
`;

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row; /* 가로로 정렬 */
  gap: 1.3rem; /* 메뉴 간격 */
  align-items: flex-start; /* 왼쪽 정렬 */
  margin-top: 4rem;
`;

export const MenuItem = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center; /* 중앙 정렬 */
  width: 3cm;
  height: 4cm;
  
  cursor: pointer; /* 클릭 가능한 커서로 변경 */
`;

export const MenuIcon = styled.div`
  font-size: 2.5rem; /* 아이콘 크기 */
  margin-bottom: 1rem; /* 아이콘과 텍스트 사이의 간격 */
`;

export const MenuText = styled.div`
  font-size: 1rem; /* 메뉴 이름 폰트 사이즈 */
  text-align: center; /* 텍스트 중앙 정렬 */
`;

export const Subtitle = styled.h2`
  font-size: 1.5rem; /* 소제목 폰트 사이즈 */
  text-align: left; /* 왼쪽 정렬 */
  margin-top: -1.5rem; /* 섹션 간격 조정 */
  font-weight: bold;
`;

export const HighlightText = styled.span`
  color: #156BF0; /* 강조 텍스트 색상 */
`;

export const CarouselWrapper = styled.div`
  position: relative;
  width: 100%; /* 캐러셀 너비 조정 */
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-top: -63px;

  .alice-carousel__stage {
    width: 110cm !important;
    height: 17cm !important;
    display: flex !important;
    align-items: center !important;
    margin-top: 2rem;
  }

  .alice-carousel__stage-item {
    height: 90% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    margin-right: 1.5cm !important; /* 슬라이드 간의 간격을 1cm로 설정 */
  }

  &:hover button {
    opacity: 1; /* 커서를 갖다 댔을 때 버튼 보이기 */
  }

  @media (max-width: 1024px) {
    button {
      opacity: 1; /* 작은 화면에서 버튼 항상 보이기 */
    }
  }
`;

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop) || prop.startsWith('$'),
})`
  width: 12cm;
  height: 12cm;
  margin-top: -4cm;
  background-color: ${(props) => props.bgColor || '#e0e0e0'}; /* 배경 색상 */
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

export const ExtraContainer = styled.div`
  width: 13cm;
  height: 10cm;
  margin-bottom: 6cm;
  margin-left: -4cm;
  background-color: #e0e0e0; /* 기본 배경 색상 설정 */
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 상단 정렬 */
  position: relative; /* 위치 지정 가능하도록 설정 */
  transition: transform 0.3s ease;
  overflow: hidden; /* 컨테이너를 넘어서는 부분 숨기기 */
  flex-direction: column; /* 세로 정렬 */

  /* 내부 텍스트 스타일 */
  .text-wrapper {
    position: absolute;
    top: 1rem; /* 상단 여백 */
    left: 1rem; /* 좌측 여백 */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #333;
  }

  .subtitle {
    font-size: 0.9rem; /* 보조 설명 텍스트 사이즈 */
    margin-bottom: 0.5rem; /* 설명 텍스트와 메인 텍스트 사이의 간격 */
  }

  .main-text {
    font-size: 1.5rem; /* 메인 소개 텍스트 사이즈 (소제목 사이즈와 동일) */
    font-weight: bold; /* 메인 텍스트 강조 */
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

export const SmallContainer = styled.div`
  width: 12cm;
  height: 6.5cm;
  border-radius: 15px;
  background-color: #f5f5f7; /* 배경 색상, 필요에 따라 변경 */
  position: relative; /* 위치 상대 설정 */
  margin-top: 1cm; /* 위쪽에 1cm 간격 추가 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.5cm; /* 왼쪽 패딩 추가 */
  margin-bottom: -0.5cm;

  img {
    width: 100%; /* 이미지 너비 100% */
    height: 100%; /* 이미지 높이 100% */
    object-fit: cover; /* 이미지 비율 유지하며 채우기 */
    border-radius: 15px; /* 컨테이너와 동일한 테두리 반경 */
  }
`;

export const SmallContainerText1 = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin-left: 0.8cm;
  margin-bottom: 0.2cm;
`;

export const SmallContainerText2 = styled.div`
  font-size: 1rem;
  margin-left: 0.8cm;
  margin-bottom: -0.5cm;
  color: #6e6e73;
`;

export const ExtraContainerWrapper = styled.div`
  position: relative;
  width: 100%; /* 캐러셀 너비 조정 */
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-left: -1cm; /* 왼쪽에 2cm 패딩 추가 */
  margin-top: -1.5cm;

  .alice-carousel__stage {
    height: 19cm !important;
    display: flex !important;
    align-items: center !important;
    margin-left: 4cm !important;
  }

  .alice-carousel__stage-item {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    margin-right: 5cm !important; /* 슬라이드 간의 간격을 1cm로 설정 */
  }

  &:hover button {
    opacity: 1; /* 커서를 갖다 댔을 때 버튼 보이기 */
  }
`;

export const ArrowButton = styled.button`
  position: absolute;
  top: calc(43% - 2.7rem); /* 세로 중앙에서 1cm 위로 */
  background: none;
  border: none;
  font-size: 5.4rem; /* 크기 증가 (1.8배) */
  color: rgba(2, 2, 2, 0.5); /* #020202 색상을 50% 투명하게 */
  cursor: pointer;
  z-index: 1;
  opacity: 0; /* 기본 상태에서 숨기기 */
  transition: opacity 0.7s ease;
  margin: -15px;
  &:focus {
    outline: none;
  }
  &:hover {
    opacity: 1;
  }

  & svg {
    fill: rgba(224, 224, 224, 0.5); /* 원 부분을 흰색으로 변경하여 60% 투명도 적용 */
  }
`;

export const PrevButton = styled(ArrowButton)`
  left: 1rem; /* 왼쪽 위치 조정 */
`;

export const NextButton = styled(ArrowButton)`
  right: 1rem; /* 오른쪽 위치 조정 */
`;

export const ExtraPrevButton = styled(ArrowButton)`
  left: 1rem; /* 왼쪽 위치 조정 */
  top: calc(36% - 2.7rem); /* ExtraContainer의 높이 맞춤 */
`;

export const ExtraNextButton = styled(ArrowButton)`
  right: 1rem; /* 오른쪽 위치 조정 */
  top: calc(36% - 2.7rem); /* ExtraContainer의 높이 맞춤 */
`;
