import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBell } from 'react-icons/fa';
import logo from '@assets/Logo.jpg';
import * as S from '@styles/main/Header.styles';
import NotificationMenu from './NotificationMenu';
import useAuthStore from '@zustands/authStore';
import api from '@axios/api';
import { useQuery } from '@tanstack/react-query';

const Header = () => {
  const [isNotificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [
    shouldRenderNotificationMenuOpen,
    setShouldRenderNotificationMenuOpen,
  ] = useState(false);
  const userMenuRef = useRef();
  const notificationMenuRef = useRef();
  const navigate = useNavigate();

  const { isAuthenticated, user, logout } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    logout: state.logout,
  }));

  const getInviteList = async () => {
    try {
      const { data } = await api.get(`/invites`);

      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { data: inviteList } = useQuery({
    queryKey: ['getInviteList'],
    queryFn: getInviteList,
  });

  const handleUserIconClick = () => {
    navigate('/mypage'); // "/mypage"로 라우팅
  };

  const toggleNotificationMenu = () => {
    setNotificationMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      notificationMenuRef.current &&
      !notificationMenuRef.current.contains(event.target)
    ) {
      setNotificationMenuOpen(false);
      setTimeout(() => setShouldRenderNotificationMenuOpen(false), 300);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <S.HeaderWrapper>
      <S.LogoWrapper>
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            style={{ height: '50px', cursor: 'pointer' }}
          />
        </Link>
      </S.LogoWrapper>
      <S.NavWrapper>
        <S.Nav>
          <S.NavLink as={Link} to="/board">
            게시판
          </S.NavLink>
          {isAuthenticated ? (
            <>
              <S.NavLink>
                {user ? `${user.nickname} 님` : 'Loading...'}
              </S.NavLink>
              <S.NavLink onClick={logout}>로그아웃</S.NavLink>
            </>
          ) : (
            <S.NavLink as={Link} to="/login">
              로그인
            </S.NavLink>
          )}
          <S.IconWrapper ref={userMenuRef} onClick={handleUserIconClick}>
            <FaUser />
          </S.IconWrapper>
          <S.IconWrapper ref={notificationMenuRef}>
            <FaBell onClick={toggleNotificationMenu} />
            {inviteList?.data.length > 0 && <S.NotificationBadge />}
            {/* 빨간색 점 표시 */}
            {isNotificationMenuOpen && (
              <NotificationMenu
                $isVisible={isNotificationMenuOpen}
                inviteList={inviteList}
              />
            )}
          </S.IconWrapper>
        </S.Nav>
      </S.NavWrapper>
    </S.HeaderWrapper>
  );
};

export default Header;
