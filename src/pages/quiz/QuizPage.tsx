import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuiz } from '../../context/QuizContext';
import { Button } from '@nextui-org/react';

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizQuestions } = location.state; 
  const { questions, timeLeft, setTimeLeft } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(new Array(quizQuestions.length).fill(''));
  const [score, setScore] = useState(0);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timer);
          localStorage.removeItem('quizTimeLeft');
          navigate('/quiz/results', { state: { score, totalQuestions: quizQuestions.length } })
          return 0;
        }
        localStorage.setItem('quizTimeLeft', prevTimeLeft - 1);
        return prevTimeLeft - 1; 
      });
    }, 1000); 

    return () => clearInterval(timer);
  }, [setTimeLeft, navigate]);

  useEffect(() => {
  localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers)); 
}, [selectedAnswers]);

  useEffect(() => {
  const savedTimeLeft = localStorage.getItem('quizTimeLeft');
  const savedAnswers = localStorage.getItem('selectedAnswers');
  
  if (savedTimeLeft) {
    setTimeLeft(parseInt(savedTimeLeft)); 
  }

  if (savedAnswers) {
    setSelectedAnswers(JSON.parse(savedAnswers)); 
  }
}, [setTimeLeft]);


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
    <div className="quiz-page p-5">
      <div className='flex justify-between px-6 sm:px-32'>
        <h1>Quiz Time!</h1>
        <Button color='primary' variant='flat'>Time Left: {formatTime(timeLeft)}</Button>
      </div>

      <div className='text-center'>
        <p>{`Question ${currentQuestionIndex + 1} / ${quizQuestions.length}`}</p>
      </div>

      <div className="question flex flex-col items-center justify-center mt-20">
        <h2 className='text-2xl font-bold'>{currentQuestion.question}</h2>
        <ul className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16'>
          {currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer).map((answer, idx) => (
            <li key={idx} className="w-[350px] py-3 border border-slate-200 px-2 rounded-lg ">
              <label className='flex gap-2'>
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

      <div className="navigation-buttons flex justify-center px-6 gap-16 mt-10">
        <Button variant='flat' color='primary' onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
          Prev
        </Button>

        <Button variant='solid' color='primary' onClick={handleNextQuestion} disabled={!selectedAnswers[currentQuestionIndex]}>
          {currentQuestionIndex < quizQuestions.length - 1 ? 'Next' : 'Finish'}
        </Button>
      </div>
    </div>
  );
};

export default QuizPage;
