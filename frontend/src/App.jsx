// src/router.jsx
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import InterviewPage from './pages/InterviewPage';
import EvaluationPage from './pages/EvaluationPage';
import About from './pages/About';
import Login from './components/Login';
import Register from './components/Register';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
function AppRouter() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/evaluation" element={<EvaluationPage />} />
        <Route path="/about" element={<About/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/blogs' element={<Blog/>}></Route>
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
