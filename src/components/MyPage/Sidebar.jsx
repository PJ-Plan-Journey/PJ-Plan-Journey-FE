// src/components/MyPage/Sidebar.jsx

import React from 'react';
import { FaCogs, FaUserFriends, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import * as S from '@styles/mypage/Sidebar.styles'; // 스타일 경로

const Sidebar = ({ setSelectedMenu }) => {
  return (
    <S.SidebarContainer>
      <S.MenuItem onClick={() => setSelectedMenu('account')}>
        <S.MenuItemIcon>
          <FaCogs />
        </S.MenuItemIcon>
        <S.MenuText>계정 설정</S.MenuText>
      </S.MenuItem>
      <S.MenuItem onClick={() => setSelectedMenu('friends')}>
        <S.MenuItemIcon>
          <FaUserFriends />
        </S.MenuItemIcon>
        <S.MenuText>친구 관리</S.MenuText>
      </S.MenuItem>
      <S.MenuItem onClick={() => setSelectedMenu('travel')}>
        <S.MenuItemIcon>
          <FaCalendarAlt />
        </S.MenuItemIcon>
        <S.MenuText>일정 관리</S.MenuText>
      </S.MenuItem>
      <S.MenuItem onClick={() => alert('로그아웃 클릭')}>
        <S.MenuItemIcon>
          <FaSignOutAlt />
        </S.MenuItemIcon>
        <S.MenuText>로그아웃</S.MenuText>
      </S.MenuItem>
    </S.SidebarContainer>
  );
};

export default Sidebar;
