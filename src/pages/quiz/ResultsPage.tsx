import { useLocation, useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions } = location.state; 

  const { retryQuiz } = useQuiz();

  const handleRetryQuiz = () => {
    retryQuiz();

  };

  // Fungsi untuk kembali ke home
  const handleGoHome = () => {
    navigate('/dashboard'); 
  };

  return (
    <div className="results-page">
      <h1>Quiz Results</h1>
      <p>
        You scored {score} out of {totalQuestions}!
      </p>
      <div className="button-group">
        <button onClick={handleRetryQuiz} className="retry-button">
          Ulangi Quiz
        </button>
        <button onClick={handleGoHome} className="home-button">
          Kembali ke Home
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
