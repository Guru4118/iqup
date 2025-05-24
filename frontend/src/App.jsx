import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="text-center py-4 bg-white shadow-md">
        <Link to="/" className="text-blue-600 mx-4 font-semibold">Login</Link>
        <Link to="/register" className="text-blue-600 mx-4 font-semibold">Register</Link>
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
