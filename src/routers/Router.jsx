import { lazy, Suspense } from 'react';
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
            <Suspense>
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/mypage"
          element={
            <Suspense>
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/plan/create"
          element={
            <Suspense>
              <ProtectedRoute>
                <PlanPage />
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/board/:id/edit"
          element={
            <Suspense>
              <ProtectedRoute>
                <PlanEditPage />
              </ProtectedRoute>
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
