import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const { Navigate } = ReactRouterDOM;

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
