import React, { useState, useEffect } from 'react';
import useBearStore from '@zustands/bearStore';
import useDateStore from '@zustands/plan/useDateStore';
import Header from '@components/common/Header';
import { FaSignOutAlt, FaCogs, FaUserFriends, FaCalendarAlt } from 'react-icons/fa';
import AccountSettings from '@components/MyPage/AccountSettings';
import FriendManagement from '@components/MyPage/FriendManagement';
import TravelManagement from '@components/MyPage/TravelManagement';
import Modal from '@components/MyPage/Modal';
import {
  OuterContainer,
  PageContainer,
  ContentContainer,
  MenuContainerWrapper,
  MenuItem,
  MenuItemIcon,
  MainContent,
} from '@styles/auth/MyPage.styles';

const MyPage = () => {
  const { user } = useBearStore((state) => ({ user: state.user }));
  const { startDate, endDate } = useDateStore((state) => ({
    startDate: state.startDate,
    endDate: state.endDate,
  }));
  const [selectedMenu, setSelectedMenu] = useState('');
  const [days, setDays] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPasswordForDeletion, setCurrentPasswordForDeletion] = useState('');

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      const newDays = Array.from({ length: diffDays }, (_, i) => `day${i + 1}`);
      setDays(newDays);
    }
  }, [startDate, endDate]);

  const handleDeleteAccount = () => {
    // 현재 비밀번호와 함께 회원탈퇴 로직을 처리하는 함수
    if (currentPasswordForDeletion === 'userPassword') { // 여기에 실제 검증 로직을 넣어야 함
      console.log('계정이 성공적으로 삭제되었습니다.');
      setShowModal(false);
    } else {
      console.log('비밀번호가 일치하지 않습니다.');
    }
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'account':
        return <AccountSettings user={user} onDeleteAccount={() => setShowModal(true)} />;
      case 'friends':
        return <FriendManagement user={user} />;
      case 'travel':
        return <TravelManagement days={days} />;
      default:
        return <p>메뉴를 선택해주세요.</p>;
    }
  };

  return (
    <>
      <Header />
      <OuterContainer>
        <PageContainer>
          <ContentContainer>
            <MenuContainerWrapper>
              <h1>{user.name ? `${user.name} 님` : '사용자 님'}</h1>
              <MenuItem onClick={() => setSelectedMenu('account')}>
                <MenuItemIcon>
                  <FaCogs />
                </MenuItemIcon>
                계정센터
              </MenuItem>
              <MenuItem onClick={() => setSelectedMenu('friends')}>
                <MenuItemIcon>
                  <FaUserFriends />
                </MenuItemIcon>
                친구관리
              </MenuItem>
              <MenuItem onClick={() => setSelectedMenu('travel')}>
                <MenuItemIcon>
                  <FaCalendarAlt />
                </MenuItemIcon>
                나의 일정
              </MenuItem>
              <MenuItem onClick={() => alert('로그아웃 클릭')}>
                <MenuItemIcon>
                  <FaSignOutAlt />
                </MenuItemIcon>
                로그아웃
              </MenuItem>
            </MenuContainerWrapper>
            <MainContent>
              {renderContent()}
            </MainContent>
          </ContentContainer>
        </PageContainer>
      </OuterContainer>
      {showModal && (
        <Modal
          currentPasswordForDeletion={currentPasswordForDeletion}
          setCurrentPasswordForDeletion={setCurrentPasswordForDeletion}
          handleDeleteAccount={handleDeleteAccount}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default MyPage;
