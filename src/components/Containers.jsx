import React from 'react';
import styled from 'styled-components';
import busanImage from '@assets/busan.jpg';
import { FaSearch } from 'react-icons/fa';

const SectionWrapper = styled.div`
  width: calc(100% - 14cm); /* 양쪽 마진 7cm 적용 */
  margin: 0 auto;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1200px) {
    width: calc(100% - 10cm); /* 화면이 작아지면 마진을 줄임 */
  }

  @media (max-width: 768px) {
    width: calc(100% - 6cm); /* 더 작은 화면에서는 마진을 더 줄임 */
  }

  @media (max-width: 480px) {
    width: calc(100% - 2cm); /* 매우 작은 화면에서는 최소한의 마진만 적용 */
  }
`;

const SearchTitle = styled.h2`
  font-size: 2rem; /* h1과 h2 사이의 크기 */
  margin-bottom: 1.5rem; /* 제목과 검색창 사이의 간격 조절 */
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1cm; /* input과 container 사이 간격 */
  margin-top: 1cm; /* 위쪽 container와 input의 간격 */
`;

const SearchInputWrapper = styled.div`
  display: flex;
  position: relative;

  &:focus-within {
    box-shadow: 0 0 0 2px #020202; /* input과 button에 집중 시 외곽선 추가 */
    border-radius: 8px;
  }
`;

const SearchInput = styled.input`
  width: 17cm;
  height: 1.3cm; /* 검색창 높이 조정 */
  padding: 1rem; /* padding 조정 */
  border: 1px solid #ccc;
  border-radius: 8px 0 0 8px; /* 가장자리를 둥글게 */
  border-right: none;
  font-size: 1rem; /* 글자 크기 조정 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */
  &::placeholder {
    color: #aaa;
    font-size: 1rem; /* placeholder 글자 크기 조정 */
  }

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  height: 1.3cm; /* 검색 버튼 높이 조정 */
  width: 1.7cm; /* 돋보기 아이콘 크기를 input 높이에 맞춤 */
  border: 1px solid #ccc;
  border-left: none;
  background-color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 8px 8px 0; /* 가장자리를 둥글게 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */

  &:hover {
    background-color: #f0f0f0;
  }

  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled(FaSearch)`
  height: 0.8cm; /* 돋보기 아이콘 크기 조정 */
  width: 0.8cm;
`;

const ContainerWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 8.5cm); /* 4개의 컨테이너로 구성 */
  gap: 3cm 2cm; /* 세로 간격 2cm, 가로 간격 3cm */
  justify-content: center;
  width: 100%;
  margin-top: 0.5cm; /* 아래쪽 container와 input의 간격 */

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 8.5cm); /* 화면이 작아지면 3개의 컨테이너로 구성 */
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 8.5cm); /* 더 작은 화면에서는 2개의 컨테이너로 구성 */
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 8.5cm); /* 매우 작은 화면에서는 1개의 컨테이너로 구성 */
  }
`;

const Container = styled.div`
  width: 8cm;
  height: 12cm;
  background-color: #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */
  transition: box-shadow 0.3s ease, transform 0.3s ease; /* 부드러운 전환 효과 */

  &:hover {
    background-color: #d0d0d0;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3); /* hover 시 그림자 효과 증가 */
    transform: scale(1.03); /* 살짝 커지는 효과 */
  }
`;

const ImageContainer = styled.div`
  width: 8cm;
  height: 9cm;
  background-color: #ccc; /* 사진이 들어갈 부분 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RegionName = styled.div`
  width: 100%;
  height: 3cm;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 1rem;
  background-color: #f8f8f8;
  border-top: 1px solid #ccc;
  font-size: 1.5rem; /* 글자 크기 조정 */
`;

const Containers = () => {
  const handleContainerClick = (region) => {
    console.log(`${region} clicked`);
  };

  return (
    <SectionWrapper>
      <SearchWrapper>
        <SearchTitle>어디로 여행을 떠나시나요?</SearchTitle>
        <SearchInputWrapper>
          <SearchInput placeholder="도시명으로 검색해보세요." />
          <SearchButton>
            <SearchIcon />
          </SearchButton>
        </SearchInputWrapper>
      </SearchWrapper>
      <ContainerWrapper>
        {Array.from({ length: 8 }).map((_, index) => (
          <Container key={index} onClick={() => handleContainerClick(`Menu ${index + 1}`)}>
            <ImageContainer>
              <Image src={busanImage} alt="Busan" />
            </ImageContainer>
            <RegionName>Busan</RegionName>
          </Container>
        ))}
      </ContainerWrapper>
    </SectionWrapper>
  );
};

export default Containers;
