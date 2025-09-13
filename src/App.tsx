import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginForm } from './components/login-form'
import ProtectedRoute from './components/ProtectedRoute'
import { SignUp } from './components/Sign-Up'
import './index.css'
import './Logo.css'
import ForgotPassword from './pages/ForgotPassword'
import KYCProfile  from './pages/KYCProfile'
import ResetPassword from './pages/ResetPassword.tsx'
import Page from './app/dashboard/page.tsx'

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2500);
    const removeSplash = setTimeout(() => setShowSplash(false), 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeSplash);
    };
  }, []);

  return (
<>
    <div className="#">
      {showSplash ? (
        // Splash Screen
        <div
          className={`flex flex-col items-center justify-center h-full w-full transition-opacity duration-500 ease-in-out bg-pan-right ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <img
            src="/image.png" // SafePocket logo
            alt="SafePocket Logo"
            className="w-100 h-100 animate-bounce"
          />
          <p className="mt-4 text-2xl font-bold text-white drop-shadow-lg">
            SafePocket Inc
          </p>
          <p className="text-sm text-white/90 mt-1 italic">
            Your money, safely stored.
          </p>
        </div>
      ) : (
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
         <Route path="/signup" element={<SignUp />} /> 
        <Route path="/login" element={<LoginForm />} />
      
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/kyc-profile" element={<KYCProfile />} />
          <Route path="/dashboard" element={<Page />} />
        </Route>
      </Routes>
            )}
    </div>
</>
  );
}

//export default App