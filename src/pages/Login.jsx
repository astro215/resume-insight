import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => { // Pass onLogin function as a prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(''); // State to hold isAdmin status as a string
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/app/signin', {
        email,
        password
      });
  
      console.log("Server response:", response.data); // Log the entire response to check if isAdmin field is present
  
      setLoggedIn(true);
      setError(null);
      // Call onLogin function and pass email as an argument
      const adminStatus = response.data.is_Admin ? 'Yes' : 'No'; // Convert isAdmin status to string
      setIsAdmin(adminStatus);
      console.log("isAdmin:", adminStatus); // Log isAdmin status after setting it
      onLogin(email , adminStatus); 
      // Redirect to home page
      navigate("/home");
    } catch (error) {
      console.error('Error logging in:', error.response.data.error);
      setError(error.response.data.error);
      setLoggedIn(false);
    }
  };


  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded cursor-pointer">Login</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <p className="mt-4">Don't have an account? <a href="/app/signup" className="text-blue-500">Signup</a></p>
      
      {/* Display isAdmin status */}
      {loggedIn && <p className="mt-4">Admin status: {isAdmin}</p>}
    </div>
  );
};

export default Login;
