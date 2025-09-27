//import { useEffect, useState } from "react";
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
import  Settings  from "./pages/Setting"

export default function App() {

  return (
<>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
         <Route path="/signup" element={<SignUp />} /> 
        <Route path="/login" element={<LoginForm />} />
      
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/kyc-profile" element={<KYCProfile />} />
          <Route path="/dashboard" element={<Page />} />
           <Route path="/Setting" element={<Settings />} />
        </Route>
      </Routes>
         
    
</>
  );
}

