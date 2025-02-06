import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedInContext } from "../contexts/IsLoggedInContext";

function ProtectedRoute({ children }) {
  const isLoggedIn = useContext(isLoggedInContext);

  if (!isLoggedIn) {
    // If user isn't logged in, return a Navigate component that sends the user to /login
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the protected route's child component.
  return children;
}

export default ProtectedRoute;
