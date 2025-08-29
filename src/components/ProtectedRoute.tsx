import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // For now, let's use a mock authentication status.
  // In a real application, this would be based on a token, user session, etc.
  const isAuthenticated = true; // Change this to false to test the redirect

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};



export default ProtectedRoute;
