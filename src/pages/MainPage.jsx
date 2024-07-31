import React from 'react';
import styled from 'styled-components';
import useBearStore from '@zustands/bearStore';
import Header from '@components/common/Header';
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

const MainPage = () => {
  const { user } = useBearStore((state) => ({ user: state.user }));

  return (
    <>
      <Header />
      <OuterContainer>
        <PageContainer>
          <ContentContainer>
            <Sidebar user={user} />
            <MainContent />
          </ContentContainer>
        </PageContainer>
      </OuterContainer>
    </>
  );
};

export default MainPage;
