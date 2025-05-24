import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = "http://localhost:5000/api/auth";

export default function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-white bg-opacity-30 backdrop-blur-lg">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-80 rounded-2xl shadow-2xl backdrop-blur-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center text-green-600 font-medium">
            {message}
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-700">
            New user?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
