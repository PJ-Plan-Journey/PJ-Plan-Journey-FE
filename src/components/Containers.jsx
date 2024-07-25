import React from 'react';
import styled from 'styled-components';
import { FaHome, FaInfo, FaUserAlt } from 'react-icons/fa';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

// 이미지 파일 경로 설정
import testImage1 from '@assets/testImage1.jpg';
import testImage2 from '@assets/testImage2.jpg';
import testImage3 from '@assets/testImage3.jpg';
import testImage4 from '@assets/testImage4.jpg';
import testImage5 from '@assets/testImage5.jpg';
import testImage6 from '@assets/testImage6.jpg';
import testImage7 from '@assets/testImage7.jpg';
import testImage8 from '@assets/justBlack.jpg';

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
  margin-top: -63px;

  .alice-carousel__stage {
    height: 18cm !important;
    display: flex !important;
    align-items: center !important;
  }

  .alice-carousel__stage-item {
    height: 90% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    margin-right: 35px !important;
  }

  &:hover button {
    opacity: 1; /* 커서를 갖다 댔을 때 버튼 보이기 */
  }
`;

const getContrastYIQ = (hex) => {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
};

const Container = styled.div`
  width: 12cm;
  height: 15cm;
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
    font-family: SF Pro KR, SF Pro Display, SF Pro Icons, Apple Gothic, HY Gulim, MalgunGothic, HY Dotum, Lexi Gulim, Helvetica Neue, Helvetica, Arial, sans-serif;
    color: ${(props) =>
      getContrastYIQ(props.bgColor || '#e0e0e0')}; /* 텍스트 색상 */
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

const ExtraContainer = styled.div`
  width: 16cm;
  height: 15cm;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  overflow: hidden; /* 컨테이너를 넘어서는 부분 숨기기 */
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

const ExtraContainerWrapper = styled.div`
  display: flex;
  gap: 1.5rem; /* 컨테이너 간 간격 */
`;

const ArrowButton = styled.button`
  position: absolute;
  top: calc(46% - 2.7rem); /* 세로 중앙에서 1cm 위로 */
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
  const items = [
    <Container key={1} bgColor="#ffdddd">
      <div className="text-wrapper">
        <div className="subtitle">서울특별시 종로구</div>
        <div className="main-text">서울 성곽길</div>
      </div>
      <img src={testImage1} alt="Test Image 1" />
    </Container>,
    <Container key={2} bgColor="#ddffdd">
      <div className="text-wrapper">
        <div className="subtitle">서울특별시 종로구</div>
        <div className="main-text">경복궁 근정전</div>
      </div>
      <img src={testImage2} alt="Test Image 2" />
    </Container>,
    <Container key={3} bgColor="#ddddff">
      <div className="text-wrapper">
        <div className="subtitle">강원도 강릉시 왕산면</div>
        <div className="main-text">안반데기</div>
      </div>
      <img src={testImage3} alt="Test Image 3" />
    </Container>,
    <Container key={4} bgColor="#ffffdd">
      <div className="text-wrapper">
        <div className="subtitle">경상남도 창녕군 유어면</div>
        <div className="main-text">우포늪</div>
      </div>
      <img src={testImage4} alt="Test Image 4" />
    </Container>,
    <Container key={5} bgColor="#ffddff">
      <div className="text-wrapper">
        <div className="subtitle">경상북도 영주시 부석면</div>
        <div className="main-text">부석사</div>
      </div>
      <img src={testImage5} alt="Test Image 5" />
    </Container>,
    <Container key={6} bgColor="#d0d0d0">
      <div className="text-wrapper">
        <div className="subtitle">경상남도 남해군 상주면</div>
        <div className="main-text">금산 보리암</div>
      </div>
      <img src={testImage6} alt="Test Image 6" />
    </Container>,
    <Container key={7} bgColor="#d0e0f0">
      <div className="text-wrapper">
        <div className="subtitle"> 경상남도 합천군 합천읍</div>
        <div className="main-text">합천 다락논</div>
      </div>
      <img src={testImage7} alt="Test Image 7" />
    </Container>,
    <Container key={8} bgColor="#f0d0d0">
      <div className="text-wrapper">
        <div className="subtitle">보조 설명 8</div>
        <div className="main-text">메인 소개 8</div>
      </div>
      <img src={testImage8} alt="Test Image 8" />
    </Container>,
  ];

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
        Plan Journey.
        <HighlightText>
          완벽한 여행을
          <br />
          계획하는 가장 좋은 방법.
        </HighlightText>
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
      <Subtitle>
        여행 계획.
        <HighlightText>언제든, 당신에게 맞는 방식으로.</HighlightText>
      </Subtitle>
      <ExtraContainerWrapper>
        <ExtraContainer bgColor="#ffdddd">추가된 컨테이너 1</ExtraContainer>
        <ExtraContainer bgColor="#ddffdd">추가된 컨테이너 2</ExtraContainer>
        <ExtraContainer bgColor="#ddddff">
          <div className="text-wrapper">
            <div className="subtitle">보조 설명 11</div>
          </div>{' '}
          <div className="main-text">메인 소개 11</div>
          추가된 컨테이너 3
        </ExtraContainer>
      </ExtraContainerWrapper>
    </SectionWrapper>
  );
};

export default Containers;
