import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("auth");

  return isAuth ? children : <Navigate to="/admin" />;
};

export default ProtectedRoute;