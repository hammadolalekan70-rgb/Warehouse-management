// src/components/Header.jsx - Ultra Minimal
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Check if current page is dashboard
  const isDashboardPage = location.pathname.startsWith("/dashboard");

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Hazan Warehouse</Link>
      </div>

      <nav className="nav-menu">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <div className="user-actions">
        {isAuthenticated && isDashboardPage ? (
          /* ONLY show on dashboard page */
          <div className="user-menu">
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : !isAuthenticated ? (
          /* Show login/register only when not logged in */
          <div className="auth-links">
            <Link to="/login" className="login-link">Login</Link>
            <Link to="/register" className="register-link">Register</Link>
          </div>
        ) : null /* Show nothing on public pages when logged in */}
      </div>
    </header>
  );
}

export default Header;