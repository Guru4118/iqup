// src/pages/HomePage.jsx
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to AI Mock Interview System</h1>
      <p className="mb-6 text-lg max-w-xl">Upload your resume, get AI-generated interview questions, and answer them with live webcam feedback and voice input.</p>
      <button
        onClick={() => navigate('/upload')}
        className="bg-green-500 px-6 py-3 rounded-lg text-white text-lg hover:bg-green-600 transition"
      >
        Start Interview
      </button>
    </div>
  );
}
