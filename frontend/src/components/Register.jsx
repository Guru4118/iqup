import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import QuickLinksPage from './QuickLinks';

const API_URL = "http://localhost:5000/api/auth";

export default function Register() {
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/register`, registerData);
      setMessage(res.data.message || 'Registration successful!');
      
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed!');
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-pink-500 opacity-30 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute bottom-0 right-10 w-[300px] h-[300px] bg-purple-500 opacity-30 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute bottom-10 left-1/3 w-[300px] h-[300px] bg-blue-500 opacity-30 rounded-full blur-3xl mix-blend-lighten z-0" />

      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Register form container */}
      <div className="relative flex flex-col items-center justify-center px-4 pt-6 min-h-screen w-full overflow-hidden z-10 " data-aos="flip-left">
        <h2 className="text-3xl font-bold text-pink-400 text-center mb-6">Register</h2>

        <form onSubmit={handleRegister} className="space-y-5 max-w-md w-full border-pink-500 border-2 rounded-2xl p-5">
          <input
            type="text"
            placeholder="Name"
            value={registerData.name}
            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
            className="w-full px-4 py-3 bg-black/40 text-white border border-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            className="w-full px-4 py-3 bg-black/40 text-white border border-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            className="w-full px-4 py-3 bg-black/40 text-white border border-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Register
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center text-sm text-green-400">
            {message}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-400 hover:underline">
            Login here
          </Link>
        </div>
      </div>

      <div className="relative z-10 mt-12">
        <QuickLinksPage />
      </div>
    </div>
  );
}
