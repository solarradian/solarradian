// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // check user from localStorage (or Redux)
  const user = JSON.parse(localStorage.getItem("user"));

  // if not logged in → redirect to login
  if (!user || !user._id) {
    return <Navigate to="/login" replace />;
  }

  // if logged in → allow
  return children;
};

export default ProtectedRoute;
