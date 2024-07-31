import React from 'react';
import { FaCogs, FaUserFriends, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import { SidebarContainer, MenuItem, MenuItemIcon, MenuText } from '@styles/mypage/Sidebar.styles';

const Sidebar = ({ setSelectedMenu }) => {
  return (
    <SidebarContainer>
      <MenuItem onClick={() => setSelectedMenu('account')}>
        <MenuItemIcon>
          <FaCogs />
        </MenuItemIcon>
        <MenuText>계정 설정</MenuText>
      </MenuItem>
      <MenuItem onClick={() => setSelectedMenu('friends')}>
        <MenuItemIcon>
          <FaUserFriends />
        </MenuItemIcon>
        <MenuText>친구 관리</MenuText>
      </MenuItem>
      <MenuItem onClick={() => setSelectedMenu('travel')}>
        <MenuItemIcon>
          <FaCalendarAlt />
        </MenuItemIcon>
        <MenuText>일정 관리</MenuText>
      </MenuItem>
      <MenuItem onClick={() => alert('로그아웃 클릭')}>
        <MenuItemIcon>
          <FaSignOutAlt />
        </MenuItemIcon>
        <MenuText>로그아웃</MenuText>
      </MenuItem>
    </SidebarContainer>
  );
};

export default Sidebar;
