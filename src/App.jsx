import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import HomeGuest from "./pages/HomeGuest";
import HomeLoggedIn from "./pages/HomeLoggedIn";
import AdminHome from "./pages/AdminHome";
import Footer from "./pages/Footer";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState('No');
  const [userEmail, setUserEmail] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.title = "Resume Revealer";
    const userLoggedIn = localStorage.getItem("loggedIn");
    const userIsAdmin = localStorage.getItem("isAdmin");
    const userDarkMode = localStorage.getItem("darkMode") === 'true';
    setDarkMode(userDarkMode); // Set the initial state based on localStorage
    if (userLoggedIn) {
      setLoggedIn(true);
      setUserEmail(localStorage.getItem("userEmail"));
      setIsAdmin(userIsAdmin);
    }
  }, []);

  const handleLogin = (email, isAdmin) => {
    setLoggedIn(true);
    setUserEmail(email);
    setIsAdmin(isAdmin);
    localStorage.setItem("loggedIn", true);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("isAdmin", isAdmin);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserEmail(null);
    setIsAdmin('No');
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAdmin");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  return (
    <div className={`App flex flex-col min-h-screen ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <Router>
        <Navbar loggedIn={loggedIn} email={userEmail} onLogout={handleLogout} toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <div className="flex-grow pt-20"> {/* Add padding top to account for fixed navbar */}
          <Routes>
            <Route path="/" element={loggedIn ? <Navigate to="/home" /> : <HomeGuest darkMode={darkMode}/>} />
            <Route path="/app/login" element={loggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLogin} darkMode={darkMode} />} />
            <Route path="/app/signup" element={<Signup darkMode={darkMode} />} />
            <Route path="/home" element={loggedIn ? (isAdmin === "Yes" ? <AdminHome darkMode={darkMode} /> : <HomeLoggedIn darkMode={darkMode} />) : <HomeGuest darkMode={darkMode} />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
