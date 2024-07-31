import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useBearStore from '@zustands/bearStore';
import useDateStore from '@zustands/plan/useDateStore';
import Header from '@components/common/Header';
import { FaCheck, FaTrash, FaUser, FaLock, FaKey, FaSignOutAlt, FaCogs, FaUserFriends, FaCalendarAlt } from 'react-icons/fa';
import AccountSettings from '@components/MyPage/AccountSettings';
import FriendManagement from '@components/MyPage/FriendManagement';
import TravelManagement from '@components/MyPage/TravelManagement';
import Modal from '@components/MyPage/Modal';
import Sidebar from '@components/MyPage/Sidebar';
import MainContent from '@components/MyPage/MainContent';

const OuterContainer = styled.div`
  background-color: white;
  width: 100%;
  max-width: 1380px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem; /* Header와의 간격 조절 */
  padding: 0 3cm; /* 양쪽 패딩 추가 */
  border-radius: 15px;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 3cm; /* Header로부터 3cm 떨어지도록 설정 */
  margin-right: 4cm;
`;

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
    <>
      <Header />
      <OuterContainer>
        <PageContainer>
          <ContentContainer>
            <Sidebar user={user} />
            <MainContent renderContent={renderContent} />
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
