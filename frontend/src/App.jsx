import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from './services/firebase'
import LoginPage from './pages/LoginPage'
import OnboardingPage from './pages/OnboardingPage'
import DashboardPage from './pages/DashboardPage'
export default function App() {
  const [user, setUser] = useState(undefined); const [cohort, setCohort] = useState(() => JSON.parse(localStorage.getItem('cohort') || 'null'))
  useEffect(() => onAuthStateChanged(auth, setUser), [])
  if (user === undefined) return null
  if (!user) return <LoginPage />
  if (!cohort) return <OnboardingPage onComplete={(value) => { localStorage.setItem('cohort', JSON.stringify(value)); setCohort(value) }} />
  return <DashboardPage user={user} cohort={cohort} onSignOut={() => { signOut(auth); setCohort(null); localStorage.removeItem('cohort') }} />
}
