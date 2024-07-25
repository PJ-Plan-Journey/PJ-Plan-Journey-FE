import React from 'react';
import styled from 'styled-components';
import { FaUser, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import logo from '@assets/logo.jpg';

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
  height: 40px; /* 로고 크기 조정 */
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem; /* 간격 조정 */
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo src={logo} alt="Logo" />
      <Nav>
        <NavLink href="/login">
          <FaSignInAlt /> 로그인
        </NavLink>
        <NavLink href="/signup">
          <FaUserPlus /> 회원가입
        </NavLink>
        <NavLink href="/mypage">
          <FaUser /> 마이페이지
        </NavLink>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
