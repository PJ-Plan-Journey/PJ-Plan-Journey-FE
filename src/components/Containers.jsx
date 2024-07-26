import React, { useRef } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaShareSquare } from 'react-icons/fa';
import { TbMapPlus } from 'react-icons/tb'; // 계획하기 아이콘
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import isPropValid from '@emotion/is-prop-valid';
// 이미지 파일 경로 설정
import testImage1 from '@assets/testImage1.jpg';
import testImage2 from '@assets/testImage2.jpg';
import testImage3 from '@assets/testImage3.jpg';
import testImage4 from '@assets/testImage4.jpg';
import testImage5 from '@assets/testImage5.jpg';
import testImage6 from '@assets/testImage6.jpg';
import testImage7 from '@assets/testImage7.jpg';
import testImage8 from '@assets/justBlack.jpg';
import food from '@assets/food1.jpg';
import BBangBBang from '@assets/BBangBBang.jpg';
import game from '@assets/game.jpg';
import zombie from '@assets/zombie.jpg';
import surinam from '@assets/surinam.jpg';
import minecraft from '@assets/minecraft.jpg';

const SectionWrapper = styled.div`
  width: calc(100% - 3cm); /* 왼쪽 마진 3cm 적용 */
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
  cursor: pointer; /* 클릭 가능한 커서로 변경 */
`;

const MenuIcon = styled.div`
  font-size: 2rem; /* 아이콘 크기 */
  margin-bottom: 0.5rem; /* 아이콘과 텍스트 사이의 간격 */
`;

const MenuText = styled.div`
  font-size: 1rem; /* 메뉴 이름 폰트 사이즈 */
  text-align: center; /* 텍스트 중앙 정렬 */
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
    width: 110cm !important;
    height: 19cm !important;
    display: flex !important;
    align-items: center !important;
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
`;

const Container = styled.div.withConfig({
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

const ArrowButton = styled.button`
  position: absolute;
  top: calc(40% - 2.7rem); /* 세로 중앙에서 1cm 위로 */
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

const ExtraPrevButton = styled(ArrowButton)`
  left: 1rem; /* 왼쪽 위치 조정 */
  top: calc(36% - 2.7rem); /* ExtraContainer의 높이 맞춤 */
`;

const ExtraNextButton = styled(ArrowButton)`
  right: 1rem; /* 오른쪽 위치 조정 */
  top: calc(36% - 2.7rem); /* ExtraContainer의 높이 맞춤 */
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

  const extraItems = [
    <ExtraContainer key={1} bgColor="#ffdddd">
      <SmallContainerText1>방콕 다이어트 파괴범 길거리 음식!</SmallContainerText1>
      <SmallContainerText2>Taejeong님의 일정 4박 5일</SmallContainerText2>
      <SmallContainer>
        <img src={food} alt="Food Image" />
      </SmallContainer>
    </ExtraContainer>,
    <ExtraContainer key={2} bgColor="#ddffdd">
      <SmallContainerText1>빵빵이의 포장마차 ~!</SmallContainerText1>
      <SmallContainerText2>옥지님의 일정 1박 2일</SmallContainerText2>
      <SmallContainer>
        <img src={BBangBBang} alt="BBangBBang Image" />
      </SmallContainer>
    </ExtraContainer>,
    <ExtraContainer key={3} bgColor="#ddddff">
      <SmallContainerText1>아빠 어릴 땐 이러고 놀았어~</SmallContainerText1>
      <SmallContainerText2>기훈이형님의 일정 30박 31일</SmallContainerText2>
      <SmallContainer>
        <img src={game} alt="Game Image" />
      </SmallContainer>
    </ExtraContainer>,
    <ExtraContainer key={4} bgColor="#ffdddd">
      <SmallContainerText1>좀비 세상에서 살아남기: 나의 브이로그</SmallContainerText1>
      <SmallContainerText2>Cris님의 일정 45박 47일</SmallContainerText2>
      <SmallContainer>
        <img src={zombie} alt="Zombie Image" />
      </SmallContainer>
    </ExtraContainer>,
    <ExtraContainer key={5} bgColor="#ddffdd">
      <SmallContainerText1>전목사님과 함께하는 집캉스~!</SmallContainerText1>
      <SmallContainerText2>강인구님의 일정 7박 8일</SmallContainerText2>
      <SmallContainer>
        <img src={surinam} alt="Surinam Image" />
      </SmallContainer>
    </ExtraContainer>,
    <ExtraContainer key={6} bgColor="#ddddff">
      <SmallContainerText1>멋봉리에 힐링하러왔어요~</SmallContainerText1>
      <SmallContainerText2>동숙님의 일정 5박 6일</SmallContainerText2>
      <SmallContainer>
        <img src={minecraft} alt="Minecraft Image" />
      </SmallContainer>
    </ExtraContainer>,
  ];

  const carouselRef = React.useRef();
  const extraCarouselRef = React.useRef();
  const journeyRef = useRef();
  const planRef = useRef();
  const shareRef = useRef(); // shareRef 추가

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

  const slideExtraPrev = () => {
    if (extraCarouselRef.current) {
      extraCarouselRef.current.slidePrev();
    }
  };

  const slideExtraNext = () => {
    if (extraCarouselRef.current) {
      extraCarouselRef.current.slideNext();
    }
  };

  const scrollToRef = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
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
        <MenuItem onClick={() => scrollToRef(journeyRef)}>
          <MenuIcon>
            <FaMapMarkerAlt />
          </MenuIcon>
          <MenuText>여행지 추천</MenuText>
        </MenuItem>
        <MenuItem onClick={() => scrollToRef(planRef)}>
          <MenuIcon>
            <TbMapPlus />
          </MenuIcon>
          <MenuText>계획하기</MenuText>
        </MenuItem>
        <MenuItem onClick={() => scrollToRef(shareRef)}> {/* shareRef로 변경 */}
          <MenuIcon>
            <FaShareSquare />
          </MenuIcon>
          <MenuText>일정공유</MenuText>
        </MenuItem>
      </MenuWrapper>
      <Subtitle ref={journeyRef}>
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
      <Subtitle ref={shareRef}> {/* ref 수정 */}
        일정 공유.
        <HighlightText>당신만의 추억, 모두의 이야기로.</HighlightText>
      </Subtitle>
      <ExtraContainerWrapper>
        <ExtraPrevButton onClick={slideExtraPrev}>
          <IoIosArrowDropleftCircle />
        </ExtraPrevButton>
        <AliceCarousel
          mouseTracking
          items={extraItems}
          responsive={{
            0: { items: 1 },
            600: { items: 2 },
            1024: { items: 3 },
            1440: { items: 4 },
          }}
          controlsStrategy="responsive"
          ref={extraCarouselRef}
          disableButtonsControls={true} // 기본 버튼 숨기기
          infinite={false}
          disableDotsControls={true} // 페이지 표시 툴 숨기기
        />
        <ExtraNextButton onClick={slideExtraNext}>
          <IoIosArrowDroprightCircle />
        </ExtraNextButton>
      </ExtraContainerWrapper>
    </SectionWrapper>
  );
};

export default Containers;
