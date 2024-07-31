import styled from 'styled-components';

export const OuterContainer = styled.div`
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

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: 100%;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 3cm; /* Header로부터 3cm 떨어지도록 설정 */
  margin-right: 4cm;
`;

export const MenuContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  top: 6cm;
  left: 7cm;
  background: #fff;
  padding: 3.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  font-size: 1.2rem; /* <MenuText> 폰트 사이즈 적용 */
  &:hover {
    background: #e0e0e0;
    border-radius: 5px;
  }
`;

export const MenuItemIcon = styled.div`
  margin-right: 20px; /* 아이콘과 메뉴 이름 사이의 여유로운 거리 */
`;

export const MenuItemRed = styled(MenuItem)`
  color: red;
  font-weight: bold;
  cursor: default;
`;

export const MainContent = styled.div`
  flex-grow: 1;
  padding: 1rem;
  margin-left: 220px; /* MenuContainer의 너비만큼 추가 마진 */
  max-height: calc(100vh - 3cm - 2rem); /* 전체 화면 높이에서 Header와 padding을 뺀 높이 */
  overflow-y: auto;
`;

export const LoginText = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const MenuText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

export const FriendRequestContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9f9f9;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 5px;
`;

export const FriendRequestActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px; /* 아이콘 간의 거리 조정 */
  width: calc(100% - 5.5cm); /* 아이콘을 왼쪽으로 3cm 더 이동 */
`;

export const FriendContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const FriendActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px; /* 아이콘 간의 거리 조정 */
  width: calc(100% - 5.5cm); /* 아이콘을 왼쪽으로 3cm 더 이동 */
`;

export const DayButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  background-color: #156BF0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const Input = styled.input`
  width: 300px;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  background-color: #156BF0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
