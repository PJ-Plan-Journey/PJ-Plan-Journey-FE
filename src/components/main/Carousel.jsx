import React from 'react';
import styled from 'styled-components';
import AliceCarousel from 'react-alice-carousel';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import 'react-alice-carousel/lib/alice-carousel.css';

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%; /* 캐러셀 너비 조정 */
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-top: -63px;

  .alice-carousel__stage {
    width: 120cm !important;
    height: 17cm !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
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

const ArrowButton = styled.button`
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

const PrevButton = styled(ArrowButton)`
  left: 1rem; /* 왼쪽 위치 조정 */
`;

const NextButton = styled(ArrowButton)`
  right: 1rem; /* 오른쪽 위치 조정 */
`;

const Carousel = ({ items, carouselRef, slidePrev, slideNext }) => (
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
);

export default Carousel;
