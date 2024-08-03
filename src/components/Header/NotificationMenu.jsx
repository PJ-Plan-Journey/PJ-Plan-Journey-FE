// src/components/main/NotificationMenu.jsx

import React from 'react';
import * as S from '@styles/main/Header.styles'; // 스타일 경로

const NotificationMenu = ({ isVisible }) => {
  return (
    <S.NotificationMenuWrapper isVisible={isVisible}>
      <S.NotificationItem>{'{user}'}님이 친구요청을 하였습니다.</S.NotificationItem>
      <S.NotificationItem>{'{user}'}님이 여행 일정에 초대했습니다.</S.NotificationItem>
      <S.NotificationItem>수정된 일정이 있습니다.</S.NotificationItem>
    </S.NotificationMenuWrapper>
  );
};

export default NotificationMenu;
