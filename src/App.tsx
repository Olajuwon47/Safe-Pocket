/*import { } from 'react'
import { LoginForm } from './components/login-form.tsx'
import { SignUp } from './components/Sign-Up.tsx'
import './index.css'

function App() {


  return (
    <>
       <LoginForm />
       <SignUp />
    </>
  )
}

export default App*/

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/login-form';
import { SignUp } from './components/Sign-Up';
import ForgotPassword from './pages/ForgotPassword';
import KYCProfile from './pages/KYCProfile';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/kyc-profile"
          element={
            <ProtectedRoute>
              <KYCProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;



