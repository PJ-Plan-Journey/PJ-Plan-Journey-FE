// src/pages/ShareBoardsPage.jsx

import React from 'react';
import Header from '@components/Header/Header';
import ShareBoard from '@components/ShareBoard'; // ShareBoard 컴포넌트를 가져옵니다.
import * as S from '@styles/mypage/MainContent.styles'; // MainContent.styles.js에서 모든 스타일을 가져옵니다.

const ShareBoardsPage = () => {
  return (
    <div>
      <Header />
      <S.BoardWrapper>
        <S.Section>
          <S.SectionTitle>공유된 일정</S.SectionTitle> {/* 섹션 제목을 '공유된 일정'으로 변경 */}
          <S.Card>
            <ShareBoard /> {/* TravelManagement 대신 ShareBoard 컴포넌트를 사용 */}
          </S.Card>
        </S.Section>
      </S.BoardWrapper>
    </div>
  );
};

export default ShareBoardsPage;
