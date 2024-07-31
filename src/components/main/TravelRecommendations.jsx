import React, { useRef } from 'react';
import {
  SectionWrapper,
  HeaderText,
  MenuWrapper,
  MenuItem,
  MenuIcon,
  MenuText,
  Subtitle,
  HighlightText,
  CarouselWrapper,
  Container,
  ExtraContainer,
  SmallContainer,
  SmallContainerText1,
  SmallContainerText2,
  ExtraContainerWrapper,
  PrevButton,
  NextButton,
  ExtraPrevButton,
  ExtraNextButton,
} from '@styles/main/TravelRecommendations.style';
import { FaMapMarkerAlt, FaShareSquare } from 'react-icons/fa';
import { TbMapPlus } from 'react-icons/tb';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
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

const TravelRecommendations = () => {
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

  const carouselRef = useRef();
  const extraCarouselRef = useRef();
  const journeyRef = useRef();
  const planRef = useRef();
  const shareRef = useRef();

  const navigate = useNavigate(); // useNavigate 훅 추가

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
        <HighlightText>Plan Journey.</HighlightText>
        완벽한 여행을
        <br />
        계획하는 가장 좋은 방법.
      </HeaderText>
      <MenuWrapper>
        <MenuItem onClick={() => scrollToRef(journeyRef)}>
          <MenuIcon>
            <FaMapMarkerAlt />
          </MenuIcon>
          <MenuText>여행지 추천</MenuText>
        </MenuItem>
        <MenuItem onClick={() => navigate('/plan/create')}>
          <MenuIcon>
            <TbMapPlus />
          </MenuIcon>
          <MenuText>계획하기</MenuText>
        </MenuItem>
        <MenuItem onClick={() => scrollToRef(shareRef)}>
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
      <Subtitle ref={shareRef} style={{ marginTop: '2rem' }}>
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

export default TravelRecommendations;
