import React, { useState } from 'react';
import { ProfileContainer, ProfileForm, Input, Button } from '@styles/Profile.styles';
import axios from '@axios/api';
import useBearStore from '@zustands/bearStore'; // 경로가 맞다면 수정할 필요 없음
import DeleteAccountButton from '@components/DeleteAccountButton';
import LogoutButton from '@components/LogoutButton';

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
    <ProfileContainer>
      <h1>Profile Page</h1>
      <ProfileForm onSubmit={handleProfileUpdate}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Update Profile</Button>
      </ProfileForm>
      <DeleteAccountButton />
      <LogoutButton />
    </ProfileContainer>
  );
};

export default ProfilePage;
