// src/styles/auth/Signup.styles.js

import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white; /* 페이지 배경색 */
  padding-top: -3rem; /* 컨텐츠를 위로 올리기 위해 상단 패딩 추가 */
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 550px; /* 최대 너비 설정 */
  padding: 1rem 3rem 2rem 3rem;
  background: #fff; /* 내용 배경색 */
  border-radius: 15px; /* 테두리 둥글게 */
  border-color: #aaa;
  border: 1px;
  margin-bottom: auto;
  margin-top: 1rem; /* 컨텐츠를 위로 올리기 위해 상단 마진 추가 */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; /* 입력란 간격 */
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%; /* 버튼과 동일한 너비 설정 */
`;

export const InputLabel = styled.label`
  position: absolute;
  top: 1.2rem;
  left: 0.8rem;
  font-size: 1.05rem;
  color: #aaa;
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 1;
  width: 80%;
`;

export const Input = styled.input`
  padding: 1.3rem 0.9rem;
  padding-bottom: 0.8rem;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  background: #fff;
  width: 100%; /* 버튼과 동일한 너비 설정 */
  box-sizing: border-box; /* Padding 및 border를 포함한 전체 너비/높이 설정 */
  
  /* 텍스트 중앙 정렬 */
  display: flex;
  align-items: center;
  box-sizing: border-box; /* Padding 및 border를 포함한 전체 너비/높이 설정 */
  
  &::placeholder {
    color: #aaa;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  &:focus ~ ${InputLabel},
  &:not(:placeholder-shown) ~ ${InputLabel} {
    font-size: 0.75rem;
    top: 0.3rem;
    left: 0.8rem;
    color: #aaa;
    background: #fff;
    padding: 0 0.1rem;
  }

  &.error {
    border-color: red; /* 오류일 때 빨간색 테두리 */
  }
`;

export const HalfInput = styled(Input)`
  width: calc(50% - 0.5rem); /* 반반 나누기 */
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem; /* 간격 좁히기 */
  margin-bottom: 1rem;
`;

export const EmailContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  position: relative; /* 상대 위치 설정 */
`;

export const EmailInput = styled(Input)`
  flex-grow: 1; /* 남은 공간을 차지 */
  padding-right: 4rem; /* 인증하기 텍스트 공간 확보 */
`;

export const VerifyText = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: #156BF0;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;

export const Button = styled.button`
  padding: 1rem;
  font-size: 1rem;
  background-color: #156BF0;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%; /* 버튼의 너비를 100%로 설정 */
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

export const SignUpText = styled.span`
  margin-top: 1rem;
  color: #156BF0;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #0056b3;
  }
`;

