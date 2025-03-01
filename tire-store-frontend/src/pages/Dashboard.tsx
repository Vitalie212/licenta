import React from "react";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Bine ai venit la panoul de control!</p>
      <button onClick={handleLogout} className="mt-4 bg-red-500 text-white p-2 rounded">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
