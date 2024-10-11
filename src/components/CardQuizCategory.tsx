import { Button } from "@nextui-org/react";
import { quizCategories } from "../data/data";
import { useQuiz } from "../context/QuizContext";

const CardQuizCategory = () => {
  const { selectedCategory, setSelectedCategory } = useQuiz();
  const { playQuiz } = useQuiz();

  const startQuiz = async () => {
    playQuiz();
  };

  const handleCategorySelect = (categoryId: string) => {
    console.log("Category selected:", categoryId);
    setSelectedCategory(categoryId);
  };

  return (
    <div className="flex flex-col mt-20">
      <div className="text-center">
        <h1 className="text-3xl font-bold pb-3">Choose a category to start your quiz</h1>
        <h3 className="text-lg font-medium ">Test your knowledge and see how far you can go. Ready to begin?</h3>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-16 px-5 sm:px-20">
        {quizCategories.map((category) => (
          <div
            key={category.id}
            className={`p-4 w-[250px] hover:scale-105 transition-all duration-250 cursor-pointer shadow-md rounded-lg text-center text-white border-1.5 ${selectedCategory === category.id ? 'border-blue-700' : 'border-slate-300'}`}
            style={{ backgroundColor: category.color }}
            onClick={() => handleCategorySelect(category.id)}
          >
            <div className="w-full flex items-center justify-center py-2">
              <img src={`/img/${category.icon}.png`} alt={category.name} />
            </div>
            <h2 className="text-xl font-bold">{category.name}</h2>
            <p className="text-sm">{category.description}</p>
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
