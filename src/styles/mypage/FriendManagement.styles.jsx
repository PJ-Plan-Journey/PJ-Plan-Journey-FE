import styled from 'styled-components';

export const FriendContainer = styled.div`
  padding-bottom: 5rem;
`;

export const LoginText = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  &:not(:first-child) {
    padding-bottom: 2rem;
    padding: 1rem;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  color: #888
`;


export const FriendRequestContainer = styled.div`
  background: #F2F4F6;
  padding: 1rem;
  margin-left: 1rem;
  margin-top: 0.5rem;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 463px;
`;

export const FriendRequestActions = styled.div`
  display: flex;
  gap: 1rem;
  color: #020202;
`;

export const FriendContainerInner = styled.div`
  background: #F2F4F6;
  padding: 1rem;
  margin-top: 0.5rem;
  margin-left: 1rem;
  border-radius: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 463px;
`;

export const FriendActions = styled.div`
  display: flex;
  gap: 1rem;
  color: #020202; 
`;

export const Button = styled.button`
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  margin-top: 1rem;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #156BF0;
  }
  height: 2.8rem;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex-grow: 1;
  margin-top: 1rem;
  margin-right: 0.5rem;
  margin-left: 1rem;
  max-width: 350px;
  width: 70%;
  height: 2.8rem;
`;

export const AddFriendSection = styled.div`
  display: flex;
  align-items: center; /* input과 버튼을 가로 정렬 */
`;

export const LoadMoreButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px 20px;
  margin: 20px 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

