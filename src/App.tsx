import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import HomePageUser from './pages/home/HomePageUser'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/dashboard" element={<HomePageUser/>} />
      </Routes>
    </>
  )
}

export default App
