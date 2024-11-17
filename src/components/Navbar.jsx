import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

function Navbar() {
  const { logout, currentUser } = useAuth();
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
    <div className='flex'>
    <div className="flex h-screen fixed top-0 left-0 bottom-0">
      <aside className="w-64 bg-toyotagray text-white border-r-4">
        <div className="p-4 font-bold text-xl">FuelProof</div>
        <nav>
          <ul>
            <li className="p-3 hover:bg-toyotared">
              <Link to="/dashboard">Main</Link>
            </li>
            <li className="p-3 hover:bg-toyotared">
              <Link to="/data">Report Generator</Link>
            </li>
            <li className="p-3 hover:bg-toyotared">
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
    </div>
  );
}

export default Navbar;
