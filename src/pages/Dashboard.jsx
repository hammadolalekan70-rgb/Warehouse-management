// src/pages/Dashboard.jsx
import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
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
          <Link to="" className="nav-link">
            <span className="nav-icon">📊</span>
            Dashboard Home
          </Link>
          
          <Link to="orders" className="nav-link">
            <span className="nav-icon">📦</span>
            My Orders
          </Link>
          
          <Link to="/place-order" className="nav-link">
            <span className="nav-icon">🛒</span>
            Place New Order
          </Link>
          
          <Link to="payment" className="nav-link">
            <span className="nav-icon">💰</span>
            Payment History
          </Link>
          
          <Link to="chat" className="nav-link">
            <span className="nav-icon">💬</span>
            Support Chat
          </Link>
          
          <Link to="profile" className="nav-link">
            <span className="nav-icon">👤</span>
            Profile Settings
          </Link>
          
          <Link to="track" className="nav-link">
            <span className="nav-icon">📍</span>
            Track Order
          </Link>
          
          <Link to="wishlist" className="nav-link">
            <span className="nav-icon">❤️</span>
            My Wishlist
          </Link>

          {/* Logout Button */}
          <button onClick={handleLogout} className="logout-btn">
            <span className="nav-icon">🚪</span>
            Logout
          </button>
        </nav>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-item">
            <span className="stat-label">Member since:</span>
            <span className="stat-value">2024</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total orders:</span>
            <span className="stat-value">12</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;