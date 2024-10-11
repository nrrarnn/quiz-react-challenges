import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface QuizContextType {
  selectedCategory: number | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  answers: { [key: string]: string }; 
  setAnswers: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  questions: any[]; 
  retryQuiz: () => void;
  timeLeft: number; 
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null); 
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [questions, setQuestions] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(300); 
  const navigate = useNavigate();

  const retryQuiz = async () => {
    if (!selectedCategory) {
      console.error('Category not selected.');
      return; 
    }

    try {
      const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}`);
      const quizQuestions = response.data.results;

      if (quizQuestions.length === 0) {
        console.error('No questions found for this category.');
        return;
      }

      setQuestions(quizQuestions); 
      setTimeLeft(300); 
      navigate('/quiz', { state: { quizQuestions } }); 
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
    }
  };

  return (
    <QuizContext.Provider value={{ selectedCategory, setSelectedCategory, answers, setAnswers, questions, retryQuiz, timeLeft, setTimeLeft }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
