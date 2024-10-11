import { Route, Routes } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import React, { Suspense } from 'react';
import PrivateRoute from './pages/home/PrivateRoute';

const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/auth/RegisterPage'));
const HomePageUser = React.lazy(() => import('./pages/home/HomePageUser'));
const QuizPage = React.lazy(() => import('./pages/quiz/QuizPage'));
const ResultsPage = React.lazy(() => import('./pages/quiz/ResultsPage'));

function App() {
  return (
    <QuizProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <HomePageUser />
            </PrivateRoute>
          } />
          <Route path="/quiz" element={
            <PrivateRoute>
              <QuizPage />
            </PrivateRoute>
        } />
          <Route path="/quiz/results" element={
            <PrivateRoute>
            <ResultsPage />
          </PrivateRoute>} />
        </Routes>
      </Suspense>
    </QuizProvider>
  );
}

export default App;
