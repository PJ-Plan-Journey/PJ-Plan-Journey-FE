// src/components/MyPage/MainContent.jsx

import React from 'react';
import AccountSettings from '@components/MyPage/AccountSettings';
import FriendManagement from '@components/MyPage/FriendManagement';
import TravelManagement from '@components/MyPage/TravelManagement';
import * as S from '@styles/mypage/MainContent.styles'; // 스타일 경로

const MainContent = ({ selectedMenu, user, days, setShowModal }) => {
  const renderContent = () => {
    switch (selectedMenu) {
      case 'account':
        return (
          <S.Section>
            <S.SectionTitle>계정센터</S.SectionTitle>
            <S.LoginTextContainer>
              <S.LoginText>개인정보</S.LoginText>
              <S.Card>
                <p>
                  <strong>이름:</strong> {user.name}
                </p>
                <p>
                  <strong>계정:</strong> {user.email}
                </p>
              </S.Card>
            </S.LoginTextContainer>
            <S.LoginTextContainer>
              <S.LoginText>비밀번호 수정</S.LoginText>
              <AccountSettings
                user={user}
                onDeleteAccount={() => setShowModal(true)}
              />
            </S.LoginTextContainer>
          </S.Section>
        );
      case 'friends':
        return (
          <S.Section>
            <S.SectionTitle>친구 관리</S.SectionTitle>
            <S.Card>
              <FriendManagement user={user} />
            </S.Card>
          </S.Section>
        );
      case 'travel':
        return (
          <S.Section>
            <S.SectionTitle>일정 관리</S.SectionTitle>
            <S.Card>
              <TravelManagement days={days} />
            </S.Card>
            <S.LoginTextContainer>
              <S.LoginText>여행 계획</S.LoginText>
              <S.Card>
                {/* 여행 계획 컴포넌트 추가 가능 */}
                <p>여행 계획을 여기에 추가하세요.</p>
              </S.Card>
            </S.LoginTextContainer>
          </S.Section>
        );
      default:
        return (
          <S.Section>
            <S.Card>
              <p>메뉴를 선택해주세요.</p>
            </S.Card>
          </S.Section>
        );
    }
  };

  return <S.MainContentContainer>{renderContent()}</S.MainContentContainer>;
};

export default MainContent;
