// src/pages/ProfilePage.jsx

import React, { useState } from 'react';
import * as S from '@styles/profile/Profile.styles'; // 스타일 경로
import axios from '@axios/api';
import useBearStore from '@zustands/bearStore';
import LogoutButton from '@components/common/LogoutButton'; // 수정된 경로
import DeleteAccountButton from '@components/profile/DeleteAccountButton';

const ProfilePage = () => {
  const { user, setUser } = useBearStore((state) => ({ user: state.user, setUser: state.setUser }));
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/auth/profile', { email, password });
      setUser(response.data.user);
      console.log('Profile update successful:', response.data);
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  return (
    <S.ProfileContainer>
      <h1>Profile Page</h1>
      <S.ProfileForm onSubmit={handleProfileUpdate}>
        <S.Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <S.Input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <S.Button type="submit">Update Profile</S.Button>
      </S.ProfileForm>
      <DeleteAccountButton />
      <LogoutButton />
    </S.ProfileContainer>
  );
};

export default ProfilePage;
