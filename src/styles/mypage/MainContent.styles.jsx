// src/styles/mypage/MainContent.styles.js

import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex; /* 전체 레이아웃을 Flexbox로 설정 */
  width: 100%;
  height: 100vh; /* 화면 전체 높이 사용 */
  overflow: hidden; /* 넘치는 내용 숨김 */
`;

export const SidebarContainer = styled.div`
  width: 250px; /* 사이드바의 고정 너비 */
  height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
`;

export const MainContentContainer = styled.div`
  flex-grow: 1; /* 남은 공간을 차지 */
  max-width: calc(100% - 250px); /* Sidebar의 너비를 제외한 나머지 */
  padding: 2rem;
  overflow-y: auto;
  margin-left: 2rem;
`;

export const Section = styled.div`
  margin-bottom: 2rem;
`;

export const LoginTextContainer = styled.div`
  margin-bottom: 1rem;
  background: #fff;
  padding: 1rem;
  padding-bottom: 2rem;
  border-radius: 10px;
  line-height: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Card = styled.div`
  background: #fff;
  padding: 1rem;
  margin-top: 0.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

export const LoginText = styled.h3`
  font-size: 1.5rem;
  font-weight: normal;
  margin-bottom: 0.5rem;
  line-height: 2;
`;

export const UserText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #0056b3;
  margin-left: 0.8rem;
  margin-top: 0.8rem;
  padding-bottom: 0.8rem;
`

export const EmailText = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: #020202;
  margin-left: 0.8rem;
`

export const InputContainer = styled.div`
 margin: 1rem;
`;
export const InputWrapper = styled.div`
  margin-bottom: 0.2rem;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #888;
  border-radius: 5px;
  &::placeholder {
    color: #020202;
  }
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background-color: #0056b3;
  color: white;
  font-size: 0.8rem;
  margin-right: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #B0B8C1;
    cursor: not-allowed;
  }
`;
