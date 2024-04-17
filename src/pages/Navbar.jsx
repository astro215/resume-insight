import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ loggedIn, email, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:4000/app/signout");
      console.log(response.data); // Log response from the server
      // If sign-out was successful, call onLogout function and navigate to the login page
      onLogout();
      navigate("/home");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div className="navbar bg-blue-500 py-2 px-4 flex justify-between items-center mb-20">
      <div className="navbar__left">
        <Link to="/home" className="text-white mr-4">Home</Link>
      </div>
      <div className="navbar__right">
        {loggedIn ? (
          <>
            <span className="text-white mr-4">{email}</span>
            <button onClick={handleLogout} className="text-white mr-4">Sign Out</button>
          </>
        ) : (
          <>
            <span className="text-white mr-4">Guest</span>
            <Link to="/app/login" className="text-white mr-4">Login</Link>
            <Link to="/app/signup" className="text-white">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
