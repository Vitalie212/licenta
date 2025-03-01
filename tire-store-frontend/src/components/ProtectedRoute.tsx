import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/authService";

const ProtectedRoute = () => {
  return getToken() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
