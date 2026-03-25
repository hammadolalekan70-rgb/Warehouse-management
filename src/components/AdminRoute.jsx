// src/components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  console.log("🔐 AdminRoute - Checking access:", { user, loading });

  if (loading) {
    return <div style={{ padding: "50px", textAlign: "center" }}>Loading...</div>;
  }

  if (!user) {
    console.log("🔐 AdminRoute - No user, redirecting to admin login");
    return <Navigate to="/hidden-admin-portal" replace />;
  }

  if (user.role !== "admin") {
    console.log("🔐 AdminRoute - User is not admin, redirecting to customer dashboard");
    return <Navigate to="/dashboard" replace />;
  }

  console.log("🔐 AdminRoute - Access granted to admin");
  return children;
};

export default AdminRoute;