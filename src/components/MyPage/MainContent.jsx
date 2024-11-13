// src/components/MyPage/MainContent.jsx

import React from 'react';
import AccountSettings from '@components/MyPage/AccountSettings';
import FriendManagement from '@components/MyPage/FriendManagement';
import TravelManagement from '@components/MyPage/TravelManagement';
import * as S from '@styles/mypage/MainContent.styles';
import useAuthStore from '@zustands/useAuthStore';

const MainContent = ({ selectedMenu, days, setShowModal, travels }) => {
  const user = useAuthStore((state) => state.user);

  const renderContent = () => {
    switch (selectedMenu) {
      case 'account':
        return (
          <S.Section>
            <S.SectionTitle>계정센터</S.SectionTitle>
            <S.LoginTextContainer>
              <S.UserText>
                {user?.nickname || '닉네임 없음'}
                <strong> 님</strong>
              </S.UserText>
              <S.EmailText>{user?.email || '이메일 없음'}</S.EmailText>
            </S.LoginTextContainer>

            <AccountSettings onDeleteAccount={() => setShowModal(true)} />
          </S.Section>
        );
      case 'friends':
        return (
          <S.Section>
            <S.SectionTitle>친구관리</S.SectionTitle>
            <S.Card>
              <FriendManagement />
            </S.Card>
          </S.Section>
        );
      case 'travel':
        return (
          <S.Section>
            <S.SectionTitle>일정관리</S.SectionTitle>
            <S.Card>
              <TravelManagement travels={travels} />
            </S.Card>
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
