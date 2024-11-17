// src/pages/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

function LoginPage() {
  const { currentUser, login, error } = useAuth(); // Destructure login and error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard"); // Redirect to home if logged in
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password); // Call login function
    } catch (err) {
      // Login failed, error is already set in context
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-6">
        <h2 className="section-header text-center">Login</h2>
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Display error if any */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 mt-2 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mt-2 w-full"
          required
        />
        <button type="submit" className="p-2 mt-4 w-full btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
