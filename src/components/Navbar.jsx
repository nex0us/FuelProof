import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); // Redirect to login or home page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 font-bold text-xl">FuelProof</div>
        <nav>
          <ul>
            <li className="p-3 hover:bg-gray-700">
              <Link to="/">Home</Link>
            </li>
            <li className="p-3 hover:bg-gray-700">
              <Link to="#">Settings</Link>
            </li>
            <li className="p-3 hover:bg-gray-700">
              <Link to="#">Profile</Link>
            </li>
            <li className="p-3 hover:bg-gray-700">
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-6">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      </main>
    </div>
  );
}

export default Navbar;
