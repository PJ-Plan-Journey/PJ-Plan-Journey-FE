import React from 'react';
import AccountSettings from '@components/MyPage/AccountSettings';
import FriendManagement from '@components/MyPage/FriendManagement';
import TravelManagement from '@components/MyPage/TravelManagement';
import {
  MainContentContainer,
  Card,
  Section,
  LoginTextContainer,
  SectionTitle,
  LoginText,
} from '@styles/mypage/MainContent.styles';

const MainContent = ({ selectedMenu, user, days, setShowModal }) => {
  const renderContent = () => {
    switch (selectedMenu) {
      case 'account':
        return (
          <Section>
            <SectionTitle>계정센터</SectionTitle>
            <LoginTextContainer>
              <LoginText>개인정보</LoginText>
              <Card>
                <p>
                  <strong>이름:</strong> {user.name}
                </p>
                <p>
                  <strong>계정:</strong> {user.email}
                </p>
              </Card>
            </LoginTextContainer>
            <LoginTextContainer>
              <LoginText>비밀번호 수정</LoginText>
              <AccountSettings
                user={user}
                onDeleteAccount={() => setShowModal(true)}
              />
            </LoginTextContainer>
          </Section>
        );
      case 'friends':
        return (
          <Section>
            <SectionTitle>친구 관리</SectionTitle>
            <Card>
              <FriendManagement user={user} />
            </Card>
          </Section>
        );
      case 'travel':
        return (
          <Section>
            <SectionTitle>일정 관리</SectionTitle>
            <Card>
              <TravelManagement days={days} />
            </Card>
            <LoginTextContainer>
              <LoginText>여행 계획</LoginText>
              <Card>
                {/* 여행 계획 컴포넌트 추가 가능 */}
                <p>여행 계획을 여기에 추가하세요.</p>
              </Card>
            </LoginTextContainer>
          </Section>
        );
      default:
        return (
          <Section>
            <Card>
              <p>메뉴를 선택해주세요.</p>
            </Card>
          </Section>
        );
    }
  };

  return <MainContentContainer>{renderContent()}</MainContentContainer>;
};

export default MainContent;
