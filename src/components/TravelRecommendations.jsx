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
} from '@styles/TravelRecommendations.Style'; // @styles 별칭을 사용
import testImage1 from '@assets/testImage1.jpg';
import testImage2 from '@assets/testImage2.jpg';
// 나머지 import 생략

const TravelRecommendations = () => {
  const items = [
    // items 정의 생략
  ];

  const extraItems = [
    // extraItems 정의 생략
  ];

  const carouselRef = useRef();
  const extraCarouselRef = useRef();
  const journeyRef = useRef();
  const planRef = useRef();
  const shareRef = useRef();

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
