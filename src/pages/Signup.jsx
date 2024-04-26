import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ darkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/app/signup', {
        name,
        email,
        password
      });
      console.log(response.data);
      setSignupSuccess(true);
    } catch (error) {
      setError(error.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className={`max-w-md mx-auto p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md rounded-lg`}>
      <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>
      {!signupSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-3 border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-blue-400' : 'focus:ring-blue-500'} transition duration-200`}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-blue-400' : 'focus:ring-blue-500'} transition duration-200`}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-blue-400' : 'focus:ring-blue-500'} transition duration-200`}
            />
          </div>
        
          <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200">Signup</button>
        </form>
      ) : (
        <p className="text-center" style={{ color: darkMode ? 'green-400' : 'green-500' }}>User signed up successfully</p>
      )}
      {error && <p className="text-center mt-4" style={{ color: darkMode ? 'red-300' : 'red-500' }}>{error}</p>}
      <p className="mt-6 text-center text-gray-600">Already have an account? <a href="/app/login" className="text-blue-500 hover:underline">Login</a></p>
    </div>
  );
};

export default Signup;
