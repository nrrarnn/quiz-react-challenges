import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import HomePageUser from './pages/home/HomePageUser'
import QuizPage from './pages/quiz/QuizPage'
import ResultsPage from './pages/quiz/ResultsPage'
import { QuizProvider } from './context/QuizContext'

function App() {

  return (
    <>
      <QuizProvider>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/dashboard" element={<HomePageUser/>} />
          <Route path="/quiz" element={<QuizPage/>} />
          <Route path="/quiz/results" element={<ResultsPage/>} />
        </Routes>
      </QuizProvider>
    </> 
  )
}

export default App
