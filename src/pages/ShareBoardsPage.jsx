// src/pages/ShareBoardsPage.jsx

import React from 'react';
import Header from '@components/Header/Header';
import TravelManagement from '@components/MyPage/TravelManagement';
import * as S from '@styles/mypage/MainContent.styles'; // MainContent.styles.js에서 모든 스타일을 가져옵니다.

const ShareBoardsPage = () => {
  return (
    <div>
      <Header />
      <S.BoardWrapper>
        <S.Section>
          <S.SectionTitle>공유하기</S.SectionTitle>
          <S.Card>
            <TravelManagement />
          </S.Card>
        </S.Section>
      </S.BoardWrapper>
    </div>
  );
};

export default ShareBoardsPage;
