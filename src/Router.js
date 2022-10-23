import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login.js';
import Review from './Review.js';
import Reviews from './Reviews';

const RouteSwitch = () => {
  return (
    <BrowserRouter basename={'/'}>
      <Routes>
        <Route
          path="*"
          element={
            <Navigate
              to={`${process.env.PUBLIC_URL}/reviews/all`}
              replace={true}
            />
          }
        />
        <Route
          path={process.env.PUBLIC_URL + '/reviews'}
          element={<Reviews />}
        />
        <Route
          path={process.env.PUBLIC_URL + '/reviews/all'}
          element={<Reviews />}
        />
        <Route path={process.env.PUBLIC_URL + '/login'} element={<Login />} />
        <Route
          path={process.env.PUBLIC_URL + '/reviews/:id'}
          element={<Review />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
