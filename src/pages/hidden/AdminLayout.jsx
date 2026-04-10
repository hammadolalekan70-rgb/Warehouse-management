// src/pages/hidden/AdminLayout.jsx
import React, { useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useChat } from "../../contexts/ChatContext";

function AdminLayout() {
  const { user, logout } = useAuth();
  const { unreadCount, getAllConversations } = useChat();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/hidden-admin-portal");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { path: "/hidden-admin-portal/dashboard", icon: "📊", label: "Dashboard" },
    { path: "/hidden-admin-portal/orders", icon: "📋", label: "Orders" },
    { path: "/hidden-admin-portal/products", icon: "📦", label: "Products" },
    { path: "/hidden-admin-portal/payments", icon: "💰", label: "Payments" },
    { path: "/hidden-admin-portal/chat", icon: "💬", label: "Customer Chat" },
  ];

  // Get total orders count for badge
  const getOrderCount = () => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    return orders.length;
  };

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="admin-dashboard">
      {/* STICKY SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-profile">
          <div className="admin-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <h3>Welcome, {user?.name}!</h3>
          <p>Administrator</p>
        </div>
        
        <nav className="admin-nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const orderCount = getOrderCount();
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`admin-nav-link ${isActive ? "active" : ""} ${
                  item.label === "Customer Chat" && unreadCount > 0 ? "has-unread" : ""
                }`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.label}</span>
                {item.label === "Orders" && orderCount > 0 && (
                  <span className="nav-badge">{orderCount}</span>
                )}
                {item.label === "Customer Chat" && unreadCount > 0 && (
                  <span className="unread-badge">{unreadCount}</span>
                )}
              </Link>
            );
          })}
        </nav>
        
        <button onClick={handleLogout} className="admin-logout">
          <span className="nav-icon">🚪</span>
          <span className="nav-text">Logout</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;