import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

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
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded mt-20">
      <h2 className="text-2xl mb-4">Signup</h2>
      {!signupSuccess ? (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col mb-4">
            <input
              type="text"
              placeholder="Name"  
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
        
          <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded cursor-pointer">Signup</button>
        </form>
      ) : (
        <p className="text-green-500">User signed up successfully</p>
      )}
      <p className="mt-4">Already have an account? <a href="/app/login" className="text-blue-500">Login</a></p>
    </div>
  );
};

export default Signup;
