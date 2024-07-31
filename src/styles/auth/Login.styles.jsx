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
  width: 100%;
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
`;

export const Input = styled.input`
  padding: 1.3rem 0.9rem;
  padding-bottom: 0.8rem;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  background: #fff;
  width: 100%;
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
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

export const KakaoButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7e700;
  color: #000;
  margin-top: -0.05rem; /* Kakao 버튼과 로그인 버튼 사이 간격 */

  &:hover {
    background-color: #BDB000; /* 호버 시 색상 변경 */
  }
`;

export const KakaoLogoImage = styled.img`
  height: 1.5rem;
  margin-right: 0.5rem;
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

export const SignUpPrompt = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  color: black;
  font-size: 1rem;
`;

export const SignUpLink = styled.span`
  color: #007bff;
  cursor: pointer;
  margin-left: 0.5rem;
  text-decoration: underline;

  &:hover {
    color: #0056b3;
  }
`;
