import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuiz } from '../../context/QuizContext';

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizQuestions } = location.state; 
  const { questions, timeLeft, setTimeLeft } = useQuiz();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timer);
          navigate('/quiz/results', { state: { score, totalQuestions: quizQuestions.length } })
          return 0;
        }
        return prevTimeLeft - 1; 
      });
    }, 1000); 

    return () => clearInterval(timer);
  }, [setTimeLeft, navigate]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(new Array(quizQuestions.length).fill(''));
  const [score, setScore] = useState(0);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = e.target.value;
    setSelectedAnswers(updatedAnswers);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleNextQuestion = () => {
    if (selectedAnswers[currentQuestionIndex] === currentQuestion.correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/quiz/results', { state: { score, totalQuestions: quizQuestions.length } });
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="quiz-page">
      <h1>Quiz Time!</h1>
      <h2>Time Left: {formatTime(timeLeft)}</h2>
      <div className="question">
        <h2>{currentQuestion.question}</h2>
        <ul>
          {currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer).map((answer, idx) => (
            <li key={idx}>
              <label>
                <input
                  type="radio"
                  name={`answer-${currentQuestionIndex}`}
                  value={answer}
                  checked={selectedAnswers[currentQuestionIndex] === answer} 
                  onChange={handleAnswerChange} 
                />
                {answer}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="navigation-buttons">
        <button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
          Prev
        </button>

        <button onClick={handleNextQuestion} disabled={!selectedAnswers[currentQuestionIndex]}>
          {currentQuestionIndex < quizQuestions.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
