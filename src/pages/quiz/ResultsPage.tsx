import { useLocation, useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext";
import { Button } from "@nextui-org/react";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions } = location.state; 

  const { retryQuiz } = useQuiz();

  const handleRetryQuiz = () => {
    retryQuiz();

  };

  const handleGoHome = () => {
    navigate('/dashboard'); 
  };

  return (
    <div className="results-page flex justify-center flex-col items-center h-screen gap-3">
      <h1>Quiz Results</h1>
      <p>
        You scored {score} out of {totalQuestions}!
      </p>
      <div className="button-group flex gap-4">
        <Button color="primary" onClick={handleRetryQuiz} className="retry-button">
          Play again
        </Button>
        <Button color="primary" onClick={handleGoHome} className="home-button">
          Kembali ke Home
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;
