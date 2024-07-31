import React from 'react';
import AccountSettings from '@components/MyPage/AccountSettings';
import FriendManagement from '@components/MyPage/FriendManagement';
import TravelManagement from '@components/MyPage/TravelManagement';
import { MainContentWrapper, LoginText, MenuText, DayButton } from '@styles/mypage/MainContent.styles';

const MainContent = () => {
  const [selectedMenu, setSelectedMenu] = React.useState('');
  const [days, setDays] = React.useState(['day1', 'day2', 'day3']); // 임시 데이터

  const renderContent = () => {
    switch (selectedMenu) {
      case 'account':
        return <AccountSettings user={{ name: '사용자', email: 'user@example.com' }} onDeleteAccount={() => {}} />;
      case 'friends':
        return <FriendManagement user={{ name: '사용자', email: 'user@example.com' }} />;
      case 'travel':
        return (
          <>
            <LoginText>일정관리</LoginText>
            <MenuText>나의 여행</MenuText>
            {days.map((day, index) => (
              <DayButton key={index} onClick={() => alert(`${day} 클릭`)}>{day}</DayButton>
            ))}
          </>
        );
      default:
        return <p>메뉴를 선택해주세요.</p>;
    }
  };

  return (
    <MainContentWrapper>
      {renderContent()}
    </MainContentWrapper>
  );
};

export default MainContent;
