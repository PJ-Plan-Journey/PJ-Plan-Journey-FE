import styled from 'styled-components';

const ExtraContainer = styled.div`
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

const SmallContainer = styled.div`
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

const SmallContainerText1 = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin-left: 0.8cm;
  margin-bottom: 0.2cm;
`;

const SmallContainerText2 = styled.div`
  font-size: 1rem;
  margin-left: 0.8cm;
  margin-bottom: -0.5cm;
  color: #6e6e73;
`;

const ExtraContainerWrapper = styled.div`
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

const ExtraPrevButton = styled(ArrowButton)`
  left: 1rem; /* 왼쪽 위치 조정 */
  top: calc(36% - 2.7rem); /* ExtraContainer의 높이 맞춤 */
`;

const ExtraNextButton = styled(ArrowButton)`
  right: 1rem; /* 오른쪽 위치 조정 */
  top: calc(36% - 2.7rem); /* ExtraContainer의 높이 맞춤 */
`;

export {
  ExtraContainer,
  SmallContainer,
  SmallContainerText1,
  SmallContainerText2,
  ExtraContainerWrapper,
  ExtraPrevButton,
  ExtraNextButton,
};
