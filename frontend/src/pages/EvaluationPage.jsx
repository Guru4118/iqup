import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import QuickLinksPage from '../components/QuickLinks';
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
    <div className="relative min-h-screen bg-black text-white overflow-hidden p-8 flex items-center justify-center">
      {/* Glowing Blobs Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-0" />
      <div className="absolute top-10 left-0 w-[300px] h-[300px] bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-200 right-0 w-[300px] h-[300px] bg-purple-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-72 left-[245px] w-[300px] h-[300px] bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-300 left-0 w-[300px] h-[300px] bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-400 right-0 w-[300px] h-[300px] bg-purple-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute bottom-50 left-1/3 w-[300px] h-[300px] bg-blue-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-600 left-[245px] w-[300px] h-[300px] bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
            <div className="absolute top-500 left-0 w-[300px] h-[300px] bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-700 left-0 w-[300px] h-[300px] bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-300 left-0 w-[300px] h-[300px] bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-900 left-0 w-[300px] h-[300px] bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-800 right-0 w-[300px] h-[300px] bg-purple-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute bottom-150 left-0 w-[300px] h-[300px] bg-blue-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />

      <Navbar/>
      {/* Main content */}
      <div className="relative mt-7 z-10 max-w-3xl w-full bg-gray-900/30 p-8 rounded-lg shadow-2xl backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Interview Evaluation</h1>

        {evaluation ? (
          <div>
            <p className="mb-6 text-lg whitespace-pre-line leading-relaxed">{evaluation}</p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition font-semibold"
              >
                Go to Home
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center">Loading evaluation...</p>
        )}
      </div>
    </div>
  );
};

export default EvaluationPage;
