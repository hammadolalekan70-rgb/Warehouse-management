// src/pages/Dashboard.jsx
import React, { useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>My Dashboard</h2>
          <p className="welcome-text">
            Welcome, <strong>{user?.name || "Customer"}</strong>!
          </p>
        </div>
        
        <nav className="nav-menu">
          {/* 1. Dashboard Home - Use NavLink for active styling */}
          <NavLink 
            to="" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end
          >
            <span className="nav-icon">📊</span>
            Dashboard
          </NavLink>
          
          {/* 2. Place Order */}
          <NavLink 
            to="/place-order" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">🛒</span>
            Place Order
          </NavLink>
          
          {/* 3. My Wishlist */}
          <NavLink 
            to="wishlist" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">❤️</span>
            My Wishlist
          </NavLink>
          
          {/* 4. Payment Center */}
          <NavLink 
            to="payment" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">💰</span>
            Payment Center
          </NavLink>
          
          {/* 5. Chat with Us */}
          <NavLink 
            to="chat" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">💬</span>
            Chat with Us
          </NavLink>
          
          {/* 6. Logout */}
          <button onClick={handleLogout} className="logout-btn">
            <span className="nav-icon">🚪</span>
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;