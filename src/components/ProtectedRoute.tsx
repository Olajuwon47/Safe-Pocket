import { Navigate } from 'react-router-dom';
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') === 'true';

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
