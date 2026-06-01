import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage       from './pages/HomePage';
import UploadPage     from './pages/UploadPage';
import InterviewPage  from './pages/InterviewPage';
import EvaluationPage from './pages/EvaluationPage';
import About          from './pages/About';
import AuthForms      from './pages/AuthForms';
import Login          from './components/Login';
import Register       from './components/Register';
import Blog           from './pages/Blog';
import BlogDetail     from './pages/BlogDetail';
import Practice       from './pages/Practice';
import NotFound       from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/upload"     element={<UploadPage />} />
        <Route path="/interview"  element={<InterviewPage />} />
        <Route path="/evaluation" element={<EvaluationPage />} />
        <Route path="/about"      element={<About />} />
        <Route path="/auth"       element={<AuthForms />} />
        <Route path="/login"      element={<Login />} />
        <Route path="/register"   element={<Register />} />
        <Route path="/blogs"      element={<Blog />} />
        <Route path="/blogs/:id"  element={<BlogDetail />} />
        <Route path="/practice"   element={<Practice />} />
        <Route path="*"           element={<NotFound />} />
      </Routes>
    </Router>
  );
}
