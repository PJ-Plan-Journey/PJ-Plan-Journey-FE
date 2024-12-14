import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '@components/ProtectedRoute';

import MainPage from '@pages/MainPage';
import LoginPage from '@pages/LoginPage';
import SignupPage from '@pages/SignupPage';
import ShareBoardsPage from '@pages/ShareBoardsPage';
import PlanDetailPage from '@pages/PlanDetailPage';

const ProfilePage = lazy(() => import('@pages/ProfilePage'));
const PlanPage = lazy(() => import('@pages/PlanPage'));
const MyPage = lazy(() => import('@pages/MyPage'));
const PlanEditPage = lazy(() => import('@pages/PlanEditPage'));

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/board" element={<ShareBoardsPage />} />
        <Route path="/board/:id" element={<PlanDetailPage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plan/create"
          element={
            <ProtectedRoute>
              <PlanPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/board/:id/edit"
          element={
            <ProtectedRoute>
              <PlanEditPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
