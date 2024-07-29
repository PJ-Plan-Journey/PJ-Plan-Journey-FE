import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import
import styled from 'styled-components';
import { FaUser } from 'react-icons/fa';
import logo from '@assets/Logo.jpg';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 7cm; /* 양쪽 마진 7cm */
  box-sizing: border-box; /* 패딩을 포함한 전체 너비를 계산 */

  @media (max-width: 1200px) {
    padding: 1rem 5cm; /* 화면이 작아지면 마진을 줄임 */
  }

  @media (max-width: 768px) {
    padding: 1rem 2cm; /* 더 작은 화면에서는 마진을 더 줄임 */
  }

  @media (max-width: 480px) {
    padding: 1rem 1cm; /* 매우 작은 화면에서는 최소한의 마진만 적용 */
  }
`;

const Logo = styled.img`
  height: 60px; /* 로고 크기 조정 */
  margin-right: 55rem;
  cursor: pointer; /* 클릭 가능한 요소임을 시각적으로 표현 */
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem; /* 간격 조정 */
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;

const Header = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleLogoClick = () => {
    navigate('/'); // MainPage로 이동
  };

  return (
    <HeaderWrapper>
      <Logo src={logo} alt="Logo" onClick={handleLogoClick} /> {/* onClick 이벤트 추가 */}
      <Nav>
        <NavLink href="/login">로그인</NavLink>
        <NavLink href="/signup">회원가입</NavLink>
        <NavLink href="/mypage">
          <FaUser />
        </NavLink>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
