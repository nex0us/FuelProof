import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-4xl font-bold text-toyotared mb-4">
        Welcome to FuelProof
      </h1>
      <p className="text-lg text-toyotagray mb-6">
        Please log in or register to continue
      </p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 btn"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 btn"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;