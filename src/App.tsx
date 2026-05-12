import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { LoginForm } from './components/login-form'
import ProtectedRoute from './components/ProtectedRoute'
import { SignUp } from './components/Sign-Up'
//import  TransactionsView  from './components/transactions-view.tsx'
//import { GoalsProgress} from './components/Progress.tsx'
import './index.css'
import './Logo.css'
import Navbar from './components/Navbar.tsx'
import Footer from './components/Footer.tsx'
import Loading from './components/Loading'

const Home = lazy(() => import('./pages/Home'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const KYCProfile = lazy(() => import('./pages/KYCProfile'))
const ResetPassword = lazy(() => import('./pages/ResetPassword.tsx'))
const Page = lazy(() => import('./app/dashboard/page.tsx'))
const Settings = lazy(() => import('./pages/Setting'))
const AboutUs = lazy(() => import('./pages/About Us.tsx'))
const Contact = lazy(() => import('./pages/contact.tsx'))
const Service = lazy(() => import('./pages/Service.tsx'))
const Community = lazy(() => import('./pages/Community.tsx'))
const Faq = lazy(() => import('./pages/Faq.tsx'))

export default function App() {
  const location = useLocation();
  // List of routes where Navbar/Footer should be hidden
  const hiddenRoutes = ["/login-form", "/signup", "/dashboard", "/forgot-password", "/reset-password"];
  const hideLayout = hiddenRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login-form" element={<LoginForm />} />
          {/*  <Route path="/transactions-view" element={<TransactionsView transactions={[]}  />} />
            <Route path="/Progress" element={<GoalsProgress goals={[]}  />} />*/}
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
      </Suspense>
      {!hideLayout && <Footer />}
    </>
  );
}
