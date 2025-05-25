import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const EvaluationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const evaluation = location.state?.evaluation;

  useEffect(() => {
    if (!evaluation) {
      alert("No evaluation data found.");
      navigate('/interview'); // redirect back if no data
    }
  }, [evaluation, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Interview Evaluation</h1>

      {evaluation ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="mb-4 text-lg whitespace-pre-line">{evaluation}</p>

          <button
            onClick={() => navigate('/')}
            className="mt-6 px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition"
          >
            Go to Home
          </button>
        </div>
      ) : (
        <p>Loading evaluation...</p>
      )}
    </div>
  );
};

export default EvaluationPage;
