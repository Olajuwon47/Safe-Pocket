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

import { useState } from 'react'
import { LoginForm } from './components/login-form'
import { SignUp } from './components/Sign-Up'
import './index.css'

function App() {
  const [currentView, setCurrentView] = useState<'login' | 'signup'>('login')

  return (
    <div className="#">
      {currentView === 'login' ? (
        <LoginForm 
          onNavigateToSignUp={() => setCurrentView('signup')}
        />
      ) : (
        <SignUp 
          onNavigateToLogin={() => setCurrentView('login')}
        />
      )}
    </div>
  )
}

export default App
