// src/router.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import InterviewPage from './pages/InterviewPage';
import EvaluationPage from './pages/EvaluationPage';

// Inside <Routes>


export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/evaluation" element={<EvaluationPage />} />

      </Routes>
    </Router>
  );
}
