import styled from 'styled-components';

export const FriendContainer = styled.div`
  margin-bottom: 2rem;
`;

export const LoginText = styled.h2`
  font-size: 1.5rem; /* 폰트 크기 수정 */
  margin-bottom: 1rem;
`;

export const MenuText = styled.h3`
  font-size: 1.2rem; /* 한단계 작은 폰트 크기 */
  margin-bottom: 0.5rem;
`;

export const FriendRequestContainer = styled.div`
  background: #fff;
  padding: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 2rem; /* 간격 추가 */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 500px;
`;

export const FriendRequestActions = styled.div`
  display: flex;
  gap: 1rem; /* 아이콘 간의 간격 조정 */
`;

export const FriendContainerInner = styled.div`
  background: #fff;
  padding: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 500px;
`;

export const FriendActions = styled.div`
  display: flex;
  gap: 1rem; /* 아이콘 간의 간격 조정 */
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  background-color: #156BF0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
