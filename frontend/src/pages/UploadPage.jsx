// src/pages/UploadPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UploadPage() {
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async () => {
  const formData = new FormData();
  formData.append('resume', resume);

  try {
    const res = await axios.post('http://localhost:5000/api/resume/upload', formData, {
      withCredentials: true,
    });

    if (res.data.sessionId) {
      console.log('Session ID:', res.data.sessionId); // ✅ Log it here
      // Optionally store sessionId in localStorage or state management
      localStorage.setItem('sessionId', res.data.sessionId);
      navigate('/interview');
    }
  } catch (err) {
    console.error('Upload failed:', err);
  }
};


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <h2 className="text-2xl mb-4">Upload Your Resume (PDF)</h2>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setResume(e.target.files[0])}
        className="mb-4 text-black"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600"
      >
        Begin
      </button>
    </div>
  );
}
