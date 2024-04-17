import React, { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import Welcome from "./pages/Welcome";
import HomeGuest from "./pages/HomeGuest"; // Import guest home component
import HomeLoggedIn from "./pages/HomeLoggedIn"; // Import logged-in user home component
import AdminHome from "./pages/AdminHome"; // Import admin home component

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState('No'); // Initialize isAdmin to "No"
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    document.title = "Resume Revealer";
    const userLoggedIn = localStorage.getItem("loggedIn");
    const userIsAdmin = localStorage.getItem("isAdmin");
    if (userLoggedIn) {
      setLoggedIn(true);
      setUserEmail(localStorage.getItem("userEmail"));
      setIsAdmin(userIsAdmin); // Set isAdmin from localStorage
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
    setIsAdmin('No'); // Reset isAdmin to "No" when logging out
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAdmin");
  };

  return (
    <div className="App">
      <Router>
        <Navbar loggedIn={loggedIn} email={userEmail} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={loggedIn ? <Navigate to="/home" /> : <HomeGuest />}
          />
          <Route
            path="/app/login"
            element={
              loggedIn ? (
                <Navigate to="/home" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/app/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route
            path="/home"
            element={
              loggedIn ? (
                isAdmin === "Yes" ? (
                  <AdminHome />
                ) : (
                  <HomeLoggedIn />
                )
              ) : (
                <HomeGuest />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
