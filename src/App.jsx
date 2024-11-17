import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import { AuthProvider } from "./contexts/authContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing Page at Root Path */}
          <Route path="/" element={<LandingPage />} />

          {/* Private Routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <Dashboard />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <Dashboard />
                </>
              </PrivateRoute>
            }
          />
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
