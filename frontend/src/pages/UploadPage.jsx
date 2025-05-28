// src/pages/UploadPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import QuickLinksPage from '../components/QuickLinks';

export default function UploadPage() {
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('resume', resume);

    try {
      const res = await axios.post('https://iqup.onrender.com/api/resume/upload', formData, {
        withCredentials: true,
      });

      if (res.data.sessionId) {
        localStorage.setItem('sessionId', res.data.sessionId);
        navigate('/interview');
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-0" />
      <div className="absolute top-60 md:top-80 left-0 w-[300px] h-[300px] bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute  top-30 md:top-79 right-0 w-[300px] h-[300px] bg-purple-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute bottom-30 md:bottom-0 left-1/3 w-[300px] h-[300px] bg-blue-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-10 md:top-50 left-245 w-[300px] h-[300px] bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h2
          className="text-3xl md:text-4xl font-bold mb-6 text-pink-400"
          data-aos="fade-down"
        >
          Upload Your Resume (PDF)
        </h2>

        <p className="mb-6 text-lg text-white/80 max-w-xl" data-aos="fade-up">
          Upload your resume to begin your AI-powered mock interview journey.
        </p>

        <input
          data-aos="zoom-in"
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files[0])}
          className="mb-6 bg-white text-black px-4 py-2 rounded shadow w-full max-w-sm"
        />

        <button
          data-aos="flip-left"
          onClick={handleUpload}
          className="bg-pink-500 text-white px-8 py-3 rounded-full shadow hover:bg-pink-600 transition duration-300"
        >
          Start Interview
        </button>
      </div>
      <QuickLinksPage/>

      
    </div>
  );
}
