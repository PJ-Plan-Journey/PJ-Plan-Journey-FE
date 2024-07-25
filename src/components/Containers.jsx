import React from 'react';
import styled from 'styled-components';
import { FaHome, FaInfo, FaUserAlt } from 'react-icons/fa';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const SectionWrapper = styled.div`
  width: calc(100% - 3cm); /* 왼쪽 마진 3cm 적용 */
  margin-left: 3cm;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
  transition: transform 2.5s ease; /* 부드러운 전환 효과 추가 */

  & > * {
    margin-bottom: 2rem; /* 각 자식 요소 간의 간격 조절 */
  }

  & > *:last-child {
    margin-bottom: 0; /* 마지막 요소는 마진을 제거 */
  }
`;

const HeaderText = styled.h1`
  font-size: 2.5rem; /* 제목 폰트 사이즈 */
  text-align: left; /* 왼쪽 정렬 */
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row; /* 가로로 정렬 */
  gap: 1.5rem; /* 메뉴 간격 */
  align-items: flex-start; /* 왼쪽 정렬 */
  margin-top: 4rem;
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center; /* 중앙 정렬 */
  width: 3cm;
  height: 4cm;
`;

const MenuIcon = styled.div`
  font-size: 2rem; /* 아이콘 크기 */
  margin-bottom: 0.5rem; /* 아이콘과 텍스트 사이의 간격 */
  margin-left: -4rem;
`;

const MenuText = styled.div`
  font-size: 1rem; /* 메뉴 이름 폰트 사이즈 */
  text-align: center; /* 텍스트 중앙 정렬 */
  margin-left: -4rem;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem; /* 소제목 폰트 사이즈 */
  text-align: left; /* 왼쪽 정렬 */
`;

const HighlightText = styled.span`
  color: #6e6e73; /* 강조 텍스트 색상 */
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%; /* 캐러셀 너비 조정 */
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-top: -30px;
  .alice-carousel__stage {
    height: 18cm !important;
    display: flex !important;
    align-items: center !important;
    margin-left: 1rem;
  }
  .alice-carousel__stage-item {
    height: 90% !important;
    margin-right: 35px;
  }
  &:hover button {
    opacity: 1; /* 커서를 갖다 댔을 때 버튼 보이기 */
  }
`;

const Container = styled.div`
  width: 12cm;
  height: 15cm;
  background-color: #e0e0e0;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1cm; /* 컨테이너 상단 여백 */
  padding-bottom: 1cm; /* 컨테이너 하단 여백 */
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1; /* 가장 앞으로 위치 */

  &:hover {
    transform: scale(1.02); /* 살짝 커지는 효과 */
  }
`;

const ExtraContainer = styled.div`
  width: 16cm;
  height: 15cm;
  background-color: #e0e0e0;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02); /* 살짝 커지는 효과 */
  }
`;

const ExtraContainerWrapper = styled.div`
  display: flex;
  gap: 1.5rem; /* 컨테이너 간 간격 */
`;

const ArrowButton = styled.button`
  position: absolute;
  top: calc(50% - 2.7rem); /* 세로 중앙에서 1cm 위로 */
  background: none;
  border: none;
  font-size: 5.4rem; /* 크기 증가 (1.8배) */
  color: rgba(2, 2, 2, 0.5); /* #020202 색상을 50% 투명하게 */
  cursor: pointer;
  z-index: 1;
  opacity: 0; /* 기본 상태에서 숨기기 */
  transition: opacity 0.7s ease;
  &:focus {
    outline: none;
  }
  &:hover {
    opacity: 1;
  }

  & svg {
    fill: #f5f5f7; /* 원 부분을 흰색으로 변경 */
  }
`;

const PrevButton = styled(ArrowButton)`
  left: 1rem; /* 왼쪽 위치 조정 */
`;

const NextButton = styled(ArrowButton)`
  right: 1rem; /* 오른쪽 위치 조정 */
`;

const Containers = () => {
  const items = Array.from({ length: 8 }).map((_, index) => (
    <Container key={index}>컨테이너 {index + 1}</Container>
  ));

  const carouselRef = React.useRef();

  const slidePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.slidePrev();
    }
  };

  const slideNext = () => {
    if (carouselRef.current) {
      carouselRef.current.slideNext();
    }
  };

  return (
    <SectionWrapper>
      <HeaderText>
        Plan Journey.<HighlightText>완벽한 여행을
        <br />
        계획하는 가장 좋은 방법.</HighlightText>
      </HeaderText>
      <MenuWrapper>
        <MenuItem>
          <MenuIcon>
            <FaHome />
          </MenuIcon>
          <MenuText>홈</MenuText>
        </MenuItem>
        <MenuItem>
          <MenuIcon>
            <FaInfo />
          </MenuIcon>
          <MenuText>정보</MenuText>
        </MenuItem>
        <MenuItem>
          <MenuIcon>
            <FaUserAlt />
          </MenuIcon>
          <MenuText>사용자</MenuText>
        </MenuItem>
      </MenuWrapper>
      <Subtitle>
        여행지 추천.
        <HighlightText>지금 가장 HOT한 방문지</HighlightText>
      </Subtitle>
      <CarouselWrapper>
        <PrevButton onClick={slidePrev}>
          <IoIosArrowDropleftCircle />
        </PrevButton>
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={{
            0: { items: 1 },
            600: { items: 2 },
            1024: { items: 3 },
            1440: { items: 4 },
          }}
          controlsStrategy="responsive"
          ref={carouselRef}
          disableButtonsControls={true} // 기본 버튼 숨기기
          infinite={false}
          disableDotsControls={true} // 페이지 표시 툴 숨기기
        />
        <NextButton onClick={slideNext}>
          <IoIosArrowDroprightCircle />
        </NextButton>
      </CarouselWrapper>
      <Subtitle>여행 계획.<HighlightText>언제든, 당신에게 맞는 방식으로.</HighlightText></Subtitle>
      <ExtraContainerWrapper>
        <ExtraContainer>추가된 컨테이너 1</ExtraContainer>
        <ExtraContainer>추가된 컨테이너 2</ExtraContainer>
        <ExtraContainer>추가된 컨테이너 3</ExtraContainer>
      </ExtraContainerWrapper>
    </SectionWrapper>
  );
};

export default Containers;
