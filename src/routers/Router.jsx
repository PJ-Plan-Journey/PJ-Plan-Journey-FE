import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '@pages/LoginPage';
import SignupPage from '@pages/SignupPage';
import ProfilePage from '@pages/ProfilePage';
import MainPage from '@pages/MainPage';
import PlanPage from '@pages/PlanPage';
import MyPage from '@pages/MyPage'; // MyPage 컴포넌트 추가
import ShareBoardsPage from '@pages/ShareBoardsPage';
import ProtectedRoute from '@components/ProtectedRoute'; // ProtectedRoute 추가
import PlanDetailPage from '@pages/PlanDetailPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
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
        <Route path="/board" element={<ShareBoardsPage />} />
        <Route path="/board/:id" element={<PlanDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
