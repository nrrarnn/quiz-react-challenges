import { useLocation, useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext";
import { Button } from "@nextui-org/react";
import HeaderLayouts from "../../layouts/HeaderLayouts";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions } = location.state; 
  const { playQuiz } = useQuiz();

  const handleRetryQuiz = () => {
    playQuiz();
  };

  const handleGoHome = () => {
    navigate('/dashboard'); 
  };

  return (
    <HeaderLayouts>
      <div className="results-page flex justify-center flex-col items-center h-screen gap-3">
        <h1 className="text-3xl font-bold">Congratulation</h1>
        <p>
          You Quiz Score:
        </p>
        <p className="text-6xl font-bold">{Math.round((score / totalQuestions) * 100)}</p>
        <div>
          <p>Correct: {score}</p>
        <p>Incorrect: {totalQuestions - score}</p>
        </div>
        <div className="button-group flex gap-8 mt-8">
          <Button color="primary" onClick={handleRetryQuiz} className="retry-button">
            Play again
          </Button>
          <Button color="primary" onClick={handleGoHome} className="home-button">
            Kembali ke Home
          </Button>
        </div>
      </div>
    </HeaderLayouts>
  );
};

export default ResultsPage;
