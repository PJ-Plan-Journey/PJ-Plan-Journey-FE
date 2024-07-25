import React from 'react';
import useBearStore from '@zustands/bearStore';
import { Button } from '@styles/Profile.styles';

const LogoutButton = () => {
  const clearUser = useBearStore((state) => state.clearUser);

  const handleLogout = () => {
    clearUser();
    console.log('User logged out');
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
