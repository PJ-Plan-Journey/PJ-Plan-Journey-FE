import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBell } from 'react-icons/fa';
import { TbTableShare } from "react-icons/tb";
import logo from '@assets/Logo.jpg';
import * as S from '@styles/main/Header.styles';
import DropdownMenu from './DropdownMenu';
import NotificationMenu from './NotificationMenu';
import useAuthStore from '@zustands/authStore';
import api from '@axios/api';

const Header = () => {
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [shouldRenderUserMenu, setShouldRenderUserMenu] = useState(false);
  const [shouldRenderNotificationMenuOpen, setShouldRenderNotificationMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const userMenuRef = useRef();
  const notificationMenuRef = useRef();

  const { isAuthenticated, user, logout } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    logout: state.logout,
  }));

  useEffect(() => {
    if (isAuthenticated) {
      fetchUnreadNotifications();
    }
  }, [isAuthenticated]);

  const fetchUnreadNotifications = async () => {
    try {
      const { data } = await api.get('/notifications/unread', {
        headers: {
          Authorization: `Bearer ${yourAccessToken}`,
        },
      });
      setNotifications(data);
      setUnreadCount(data.length);
    } catch (error) {
      console.error('Unread notifications fetch failed:', error);
    }
  };

  const markNotificationsAsRead = async () => {
    try {
      await api.patch('/notifications/read');
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark notifications as read:', error);
    }
  };

  const toggleUserMenu = () => {
    if (isUserMenuOpen) {
      setUserMenuOpen(false);
      setTimeout(() => setShouldRenderUserMenu(false), 300);
    } else {
      setUserMenuOpen(true);
      setShouldRenderUserMenu(true);
    }
  };

  const toggleNotificationMenu = () => {
    if (isNotificationMenuOpen) {
      setNotificationMenuOpen(false);
      setTimeout(() => setShouldRenderNotificationMenuOpen(false), 300);
    } else {
      setNotificationMenuOpen(true);
      setShouldRenderNotificationMenuOpen(true);
      markNotificationsAsRead(); // 알림 메뉴를 열 때 알림을 읽음 처리
    }
  };

  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setUserMenuOpen(false);
      setTimeout(() => setShouldRenderUserMenu(false), 300);
    }
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
          <S.IconWrapper ref={userMenuRef} onClick={toggleUserMenu}>
            <FaUser />
            {shouldRenderUserMenu && (
              <DropdownMenu $isVisible={isUserMenuOpen} />
            )}
          </S.IconWrapper>
          <S.IconWrapper ref={notificationMenuRef}>
            <FaBell onClick={toggleNotificationMenu} /> 
            {unreadCount > 0 && <S.NotificationBadge />} {/* 빨간색 점 표시 */}
            {shouldRenderNotificationMenuOpen && (
              <NotificationMenu
                $isVisible={isNotificationMenuOpen}
                notifications={notifications}
              />
            )}
          </S.IconWrapper>
        </S.Nav>
      </S.NavWrapper>
    </S.HeaderWrapper>
  );
};

export default Header;
