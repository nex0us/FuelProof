import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
