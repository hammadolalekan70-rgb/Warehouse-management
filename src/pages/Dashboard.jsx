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
          {/* Dashboard */}
          <Link to="" className="nav-link" end>
            <span className="nav-icon">📊</span>
            Dashboard
          </Link>
          
          {/* Place Order */}
          <Link to="/place-order" className="nav-link">
            <span className="nav-icon">🛒</span>
            Place Order
          </Link>
          
          {/* My Wishlist */}
          <Link to="wishlist" className="nav-link">
            <span className="nav-icon">❤️</span>
            My Wishlist
          </Link>
          
          {/* Payment Center */}
          <Link to="payment" className="nav-link">
            <span className="nav-icon">💰</span>
            Payment Center
          </Link>
          
          {/* Chat with Us */}
          <Link to="chat" className="nav-link">
            <span className="nav-icon">💬</span>
            Chat with Us
          </Link>
          
          {/* Logout */}
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