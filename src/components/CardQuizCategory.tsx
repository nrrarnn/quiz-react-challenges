import { Button, Card } from "@nextui-org/react";
import { quizCategories } from "../data/data";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const colors = {
  blue: 'bg-blue-500',
  red: 'bg-red-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
};

const CardQuizCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  const startQuiz = async () => {
    try {
      const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}`);
      setQuestions(response.data.results);


      navigate('/quiz', { state: { questions } });
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    console.log("Category selected:", categoryId);
    setSelectedCategory(categoryId); // Update state with selected category
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-4 mt-16">
        {quizCategories.map((category) => (
          <div
            key={category.id}
            className={`p-4 max-w-[250px] cursor-pointer shadow-md rounded-lg ${colors[category.color]}`}
            onClick={() => handleCategorySelect(category.id)} // Direct function call
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