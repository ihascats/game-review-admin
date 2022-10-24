import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login.js';
import Review from './Review.js';
import Reviews from './Reviews';

const RouteSwitch = () => {
  return (
    <BrowserRouter basename={'/game-review-admin'}>
      <Routes>
        <Route
          path="*"
          element={<Navigate to={`/reviews/all`} replace={true} />}
        />
        <Route path={'/reviews'} element={<Reviews />} />
        <Route path={'/reviews/all'} element={<Reviews />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/reviews/:id'} element={<Review />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
