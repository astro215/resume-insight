import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin, darkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/app/signin', {
        email,
        password
      });
      const isAdmin = response.data.is_Admin ? 'Yes' : 'No';
      onLogin(email, isAdmin);
      navigate("/home");
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className={`max-w-md mx-auto p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md rounded-lg`}>
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full p-3 border ${darkMode ? 'border-gray-600' : 'border-gray-300'} ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-blue-400' : 'focus:ring-blue-500'} transition duration-200`}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full p-3 border ${darkMode ? 'border-gray-600' : 'border-gray-300'} ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-blue-400' : 'focus:ring-blue-500'} transition duration-200`}
        />
        <button type="submit" className={`w-full py-3 ${darkMode ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-blue-800' : 'focus:ring-blue-500'} focus:ring-opacity-50 transition duration-200`}>
          Login
        </button>
      </form>
      {error && <p className="mt-4 text-center" style={{ color: darkMode ? 'red-300' : 'red-500' }}>{error}</p>}
      <p className="mt-6 text-center">
        Don't have an account? <a href="/app/signup" className={`hover:underline ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>Signup</a>
      </p>
    </div>
  );
};

export default Login;
