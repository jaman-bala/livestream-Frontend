// PrivateRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('access_token') !== null;

  return isAuthenticated ? (
    <Route element={element} {...rest} />
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoute;
