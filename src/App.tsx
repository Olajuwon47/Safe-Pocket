//import { useEffect, useState } from "react";
import {  Route, Routes } from 'react-router-dom'
import { LoginForm } from './components/login-form'
import ProtectedRoute from './components/ProtectedRoute'
import { SignUp } from './components/Sign-Up'
import './index.css'
import './Logo.css'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import KYCProfile  from './pages/KYCProfile'
import ResetPassword from './pages/ResetPassword.tsx'
import Page from './app/dashboard/page.tsx'
import  Settings  from "./pages/Setting"
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import AboutUs from './pages/About Us.tsx';
import Contact from './pages/contact.tsx';
import Service from './pages/Service.tsx';
import Community from './pages/Community.tsx';
import Faq from './pages/Faq.tsx';

export default function App() {

  return (
<>
  <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/signup" element={<SignUp />} /> 
        <Route path="/login-form" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/About Us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
         <Route path="/Service" element={<Service />} />
          <Route path="/Community" element={<Community />} />
         <Route path="/Faq" element={<Faq />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/kyc-profile" element={<KYCProfile />} />
          <Route path="/dashboard" element={<Page />} />
           <Route path="/Setting" element={<Settings />} />
        </Route>
      </Routes>
  <Footer />
    
</>
  );
}

