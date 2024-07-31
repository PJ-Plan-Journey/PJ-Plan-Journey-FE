import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '@pages/LoginPage';
import SignupPage from '@pages/SignupPage';
import ProfilePage from '@pages/ProfilePage';
import MainPage from '@pages/MainPage';
import PlanPage from '@pages/PlanPage';
import MyPage from '@pages/MyPage'; // MyPage 컴포넌트 추가

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/plan/create" element={<PlanPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
