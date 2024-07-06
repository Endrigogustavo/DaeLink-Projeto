// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate, Route ,Outlet} from 'react-router-dom';
import { isAuthenticated } from './Auth';

const PrivateRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
  };

export default PrivateRoute;
