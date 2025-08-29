
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
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginForm } from './components/login-form'
import ProtectedRoute from './components/ProtectedRoute'
import { SignUp } from './components/Sign-Up'
import './index.css'
import ForgotPassword from './pages/ForgotPassword'
import KYCProfile  from './pages/KYCProfile'
import ResetPassword from './pages/ResetPassword.tsx'
import Page from './app/dashboard/page.tsx'

function App() {
  return (
    <div className="#">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/kyc-profile" element={<KYCProfile />} />
          <Route path="/dashboard" element={<Page />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App