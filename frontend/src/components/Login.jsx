import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './Navbar';
import QuickLinksPage from './QuickLinks';

const API_URL = 'http://localhost:5000/api/auth';

export default function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, loginData);
      setMessage(res.data.message || 'Login successful! Token: ' + res.data.token);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Glowing Background Blobs */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-0" />
      <div className="absolute top-10 left-0 w-[300px] h-[300px] bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-10 right-0 w-[300px] h-[300px] bg-purple-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute bottom-10 left-1/3 w-[300px] h-[300px] bg-blue-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-0" />

      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Login Card */}
      <main className="relative z-10 flex-grow flex items-center justify-center px-6 py-12 pt-30">
        <div
          data-aos="flip-right"
          className="bg-black/80 border border-pink-500 rounded-3xl shadow-lg max-w-md w-full p-10"
        >
          <h2 className="text-3xl font-bold text-pink-400 mb-8 text-center">
            Login 
          </h2>

          <form className="space-y-6" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              className="w-full px-5 py-3 bg-black/40 text-white border border-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full px-5 py-3 bg-black/40 text-white border border-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Login
            </button>
          </form>

          {message && (
            <div className="mt-4 text-center text-sm text-green-400 select-text">
              {message}
            </div>
          )}

          <p className="mt-6 text-center text-gray-300 text-sm">
            New user?{' '}
            <Link to="/register" className="text-pink-400 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </main>

      {/* Quick Links */}
      <div data-aos="fade-up" >
        <QuickLinksPage />
      </div>
    </div>
  );
}
