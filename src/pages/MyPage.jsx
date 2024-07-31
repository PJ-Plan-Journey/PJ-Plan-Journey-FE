import React, { useState, useEffect } from 'react';
import useBearStore from '@zustands/bearStore';
import useDateStore from '@zustands/plan/useDateStore';
import Header from '@components/common/Header';
import Sidebar from '@components/MyPage/Sidebar';
import MainContent from '@components/MyPage/MainContent';
import Modal from '@components/MyPage/Modal';
import { PageContainer, ContentContainer } from '@styles/mypage/MyPage.styles';

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
    if (currentPasswordForDeletion === 'userPassword') {
      console.log('계정이 성공적으로 삭제되었습니다.');
      setShowModal(false);
    } else {
      console.log('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <>
      <Header />
      <PageContainer>
        <Sidebar setSelectedMenu={setSelectedMenu} />
        <ContentContainer>
          <MainContent
            selectedMenu={selectedMenu}
            user={user}
            startDate={startDate}
            endDate={endDate}
            days={days}
            setShowModal={setShowModal}
          />
        </ContentContainer>
      </PageContainer>
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
