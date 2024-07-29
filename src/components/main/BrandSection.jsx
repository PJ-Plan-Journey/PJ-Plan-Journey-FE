import React from 'react';
import styled from 'styled-components';
import backgroundBrandImage from '@assets/BackgroundBrandImage.jpg';

const BrandSectionWrapper = styled.div`
  width: 100%;
  height: 11cm; /* 파티션 부분 높이 설정 */
  background-image: url(${backgroundBrandImage});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const BrandSection = () => {
  return <BrandSectionWrapper />;
};

export default BrandSection;