import { useState } from 'react'
import './App.css'
import { Navbar } from './components/shared/Navbar'
import { createBrowserRouter } from 'react-router-dom'
import { Login } from './components/auth/Login'
import { Signup } from './components/auth/Signup'
import { Home } from './components/Home'
import { RouterProvider } from 'react-router-dom'
import { Jobs } from './components/Jobs'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
