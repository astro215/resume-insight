import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ loggedIn, email, onLogout, toggleDarkMode, darkMode }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:4000/app/signout");
      console.log(response.data); // Log response from the server
      onLogout();
      navigate("/home");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div
      className={`navbar bg-${
        darkMode ? "secondary" : "primary"
      } py-4 px-6 flex justify-between items-center`}
    >
      <div className="navbar__left">
        <Link to="/home" className="flex items-center text-white mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Resume Insights
        </Link>
      </div>
      <div className="navbar__right">
        {loggedIn ? (
          <>
            <span className="text-white mr-4">{email}</span>
            <button onClick={handleLogout} className="btn btn-light mr-4">
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/home" className="btn btn-light mr-4">
              Guest
            </Link>
            <Link to="/app/login" className="btn btn-light mr-4">
              Login
            </Link>
            <Link to="/app/signup" className="btn btn-light mr-4">
              Sign Up
            </Link>
          </>
        )}
        <button
          onClick={toggleDarkMode}
          className={`btn btn-${darkMode ? "light" : "dark"}`}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* <button onClick={toggleDarkMode} className={`px-4 py-2 rounded font-semibold ${darkMode ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-gray-200'}`}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button> */}
      </div>
    </div>
  );
};

export default Navbar;
