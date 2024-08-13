// src/components/main/TravelRecommendations.jsx

import React, { useRef } from 'react';
import * as S from '@styles/main/TravelRecommendations.style'; // 스타일 파일 경로
import { FaMapMarkerAlt, FaShareSquare } from 'react-icons/fa';
import { 
  TbMapPlus,
  TbTableShare,
} from 'react-icons/tb';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useNavigate } from 'react-router-dom';
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
    <S.Container>
      <S.Overlay>
        <div className="text-wrapper">
          <div className="subtitle">서울특별시 종로구</div>
          <div className="main-text">서울 성곽길</div>
        </div>
      </S.Overlay>
      <img src={testImage1} alt="Test Image 1" />
    </S.Container>,

    <S.Container>
      <S.Overlay>
        <div className="text-wrapper">
          <div className="subtitle">서울특별시 종로구</div>
          <div className="main-text">경복궁 근정전</div>
        </div>
      </S.Overlay>
      <img src={testImage2} alt="Test Image 2" />
    </S.Container>,
    <S.Container>
      <S.Overlay>
        <div className="text-wrapper">
          <div className="subtitle">강원도 강릉시 왕산면</div>
          <div className="main-text">안반데기</div>
        </div>
      </S.Overlay>
      <img src={testImage3} alt="Test Image 3" />
    </S.Container>,
    <S.Container>
      <S.Overlay>
        <div className="text-wrapper">
          <div className="subtitle">경상남도 창녕군 유어면</div>
          <div className="main-text">우포늪</div>
        </div>
      </S.Overlay>
      <img src={testImage4} alt="Test Image 4" />
    </S.Container>,
    <S.Container>
      <S.Overlay>
        <div className="text-wrapper">
          <div className="subtitle">경상북도 영주시 부석면</div>
          <div className="main-text">부석사</div>
        </div>
      </S.Overlay>
      <img src={testImage5} alt="Test Image 5" />
    </S.Container>,
    <S.Container>
      <S.Overlay>
        <div className="text-wrapper">
          <div className="subtitle">경상남도 남해군 상주면</div>
          <div className="main-text">금산 보리암</div>
        </div>
      </S.Overlay>
      <img src={testImage6} alt="Test Image 6" />
    </S.Container>,
    <S.Container>
      <S.Overlay>
        <div className="text-wrapper">
          <div className="subtitle"> 경상남도 합천군 합천읍</div>
          <div className="main-text">합천 다락논</div>
        </div>
      </S.Overlay>
      <img src={testImage7} alt="Test Image 7" />
    </S.Container>,
    <S.Container key={8} bgColor="#f0d0d0">
      <S.Overlay>
        <div>
          <div className="subtitle">보조 설명 8</div>
          <div className="main-text">메인 소개 8</div>
        </div>
      </S.Overlay>
      <img src={testImage8} alt="Test Image 8" />
    </S.Container>,
  ];

  const extraItems = [
    <S.ExtraContainer>
      <S.SmallContainerText1>
        방콕 다이어트 파괴범 길거리 음식!
      </S.SmallContainerText1>
      <S.SmallContainerText2>Taejeong님의 일정 4박 5일</S.SmallContainerText2>
      <S.SmallContainer>
        <img src={food} alt="Food Image" />
      </S.SmallContainer>
    </S.ExtraContainer>,
    <S.ExtraContainer>
      <S.SmallContainerText1>빵빵이의 포장마차 ~!</S.SmallContainerText1>
      <S.SmallContainerText2>옥지님의 일정 1박 2일</S.SmallContainerText2>
      <S.SmallContainer>
        <img src={BBangBBang} alt="BBangBBang Image" />
      </S.SmallContainer>
    </S.ExtraContainer>,
    <S.ExtraContainer>
      <S.SmallContainerText1>아빠 어릴 땐 이러고 놀았어~</S.SmallContainerText1>
      <S.SmallContainerText2>기훈이형님의 일정 30박 31일</S.SmallContainerText2>
      <S.SmallContainer>
        <img src={game} alt="Game Image" />
      </S.SmallContainer>
    </S.ExtraContainer>,
    <S.ExtraContainer>
      <S.SmallContainerText1>
        좀비 세상에서 살아남기: 나의 브이로그
      </S.SmallContainerText1>
      <S.SmallContainerText2>Cris님의 일정 45박 47일</S.SmallContainerText2>
      <S.SmallContainer>
        <img src={zombie} alt="Zombie Image" />
      </S.SmallContainer>
    </S.ExtraContainer>,
    <S.ExtraContainer>
      <S.SmallContainerText1>
        전목사님과 함께하는 집캉스~!
      </S.SmallContainerText1>
      <S.SmallContainerText2>강인구님의 일정 7박 8일</S.SmallContainerText2>
      <S.SmallContainer>
        <img src={surinam} alt="Surinam Image" />
      </S.SmallContainer>
    </S.ExtraContainer>,
    <S.ExtraContainer>
      <S.SmallContainerText1>멋봉리에 힐링하러왔어요~</S.SmallContainerText1>
      <S.SmallContainerText2>동숙님의 일정 5박 6일</S.SmallContainerText2>
      <S.SmallContainer>
        <img src={minecraft} alt="Minecraft Image" />
      </S.SmallContainer>
    </S.ExtraContainer>,
  ];

  const carouselRef = useRef();
  const extraCarouselRef = useRef();
  const journeyRef = useRef();
  const shareRef = useRef();

  const navigate = useNavigate();

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
    <S.SectionWrapper>
      <S.HeaderText>
        <S.HighlightText>Plan Journey.</S.HighlightText>
        완벽한 여행을
        <br />
        계획하는 가장 좋은 방법.
      </S.HeaderText>
      <S.MenuWrapper>
        <S.MenuItem onClick={() => scrollToRef(journeyRef)}>
          <S.MenuIcon>
            <FaMapMarkerAlt />
          </S.MenuIcon>
          <S.MenuText>여행지 추천</S.MenuText>
        </S.MenuItem>
        <S.MenuItem onClick={() => navigate('/plan/create')}>
          <S.MenuIcon>
            <TbMapPlus />
          </S.MenuIcon>
          <S.MenuText>계획하기</S.MenuText>
        </S.MenuItem>
        <S.MenuItem onClick={() => scrollToRef(shareRef)}>
          <S.MenuIcon>
            <FaShareSquare />
          </S.MenuIcon>
          <S.MenuText>일정공유</S.MenuText>
        </S.MenuItem>
        <S.MenuItem onClick={() => navigate('/board')}>
          <S.MenuIcon>
            <TbTableShare />
          </S.MenuIcon>
          <S.MenuText>게시판</S.MenuText>
        </S.MenuItem>
      </S.MenuWrapper>
      <S.Subtitle ref={journeyRef}>
        여행지 추천.
        <S.HighlightText>지금 가장 HOT한 방문지</S.HighlightText>
      </S.Subtitle>
      <S.CarouselWrapper>
        <S.PrevButton onClick={slidePrev}>
          <IoIosArrowDropleftCircle />
        </S.PrevButton>
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
          disableButtonsControls={true}
          infinite={false}
          animationDuration={1000}
          disableDotsControls={true}
        />
        <S.NextButton onClick={slideNext}>
          <IoIosArrowDroprightCircle />
        </S.NextButton>
      </S.CarouselWrapper>
      <S.Subtitle ref={shareRef} style={{ marginTop: '2rem' }}>
        일정 공유.
        <S.HighlightText>당신만의 추억, 모두의 이야기로.</S.HighlightText>
      </S.Subtitle>
      <S.ExtraContainerWrapper>
        <S.ExtraPrevButton onClick={slideExtraPrev}>
          <IoIosArrowDropleftCircle />
        </S.ExtraPrevButton>
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
          disableButtonsControls={true}
          infinite={false}
          animationDuration={800}
          disableDotsControls={true}
        />
        <S.ExtraNextButton onClick={slideExtraNext}>
          <IoIosArrowDroprightCircle />
        </S.ExtraNextButton>
      </S.ExtraContainerWrapper>
    </S.SectionWrapper>
  );
};

export default TravelRecommendations;
