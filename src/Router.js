import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.js';
import Login from './Login.js';
import Review from './Review.js';
import Reviews from './Reviews';

const RouteSwitch = () => {
  return (
    <BrowserRouter basename={'/'}>
      <Routes>
        <Route path={process.env.PUBLIC_URL + '/'} element={<App />} />
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
        {/* <Route path={process.env.PUBLIC_URL + '/logout'} element={<Logout/>} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
