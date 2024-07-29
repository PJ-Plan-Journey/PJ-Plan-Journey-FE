import PlanPage from '@pages/PlanPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/searchcity" element={<PlanPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
