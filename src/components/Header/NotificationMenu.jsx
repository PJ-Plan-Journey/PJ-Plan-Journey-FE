// src/components/main/NotificationMenu.jsx

import React from 'react';
import * as S from '@styles/main/Header.styles';

const NotificationMenu = ({ $isVisible, notifications }) => {
  return (
    <S.NotificationMenuWrapper $isVisible={$isVisible}>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <S.NotificationItem key={index}>
            {notification.message}
          </S.NotificationItem>
        ))
      ) : (
        <S.NoNotificationMessage>알림이 없습니다.</S.NoNotificationMessage>
      )}
    </S.NotificationMenuWrapper>
  );
};

export default NotificationMenu;
