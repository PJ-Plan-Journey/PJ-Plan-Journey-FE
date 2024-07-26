import SelectPlace from '@pages/createPlan/SelectPlace';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/searchcity" element={<SelectPlace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
