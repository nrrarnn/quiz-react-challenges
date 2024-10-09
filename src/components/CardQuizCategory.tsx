import { Button } from "@nextui-org/react";
import { quizCategories } from "../data/data";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

const CardQuizCategory = () => {
  const { selectedCategory, setSelectedCategory } = useQuiz();
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const startQuiz = async () => {
    if (!selectedCategory) return; 

    try {
      const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}`);
      const quizQuestions = response.data.results;

      if (quizQuestions.length === 0) {
        console.error('No questions found for this category.');
        return;
      }

      setQuestions(quizQuestions);
      navigate('/quiz', { state: { quizQuestions } });
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    console.log("Category selected:", categoryId);
    setSelectedCategory(categoryId);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row gap-4 mt-16 px-5 sm:px-20">
        {quizCategories.map((category) => (
          <div
            key={category.id}
            className={`p-4 max-w-[250px] cursor-pointer shadow-md rounded-lg text-white`}
            style={{ backgroundColor: category.color }}
            onClick={() => handleCategorySelect(category.id)}
          >
            <h2>{category.name}</h2>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-20">
        <Button color="primary" onClick={startQuiz} disabled={!selectedCategory}>
          Start Quiz
        </Button>
      </div>
    </div>
  );
};

export default CardQuizCategory;
