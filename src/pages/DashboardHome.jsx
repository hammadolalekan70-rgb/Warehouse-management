// src/pages/DashboardHome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
// You can import icons or use emoji/icons

function DashboardHome() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Sample data - in real app, this would come from your context/services
  const stats = {
    totalOrders: 12,
    pendingOrders: 3,
    wishlistItems: 5,
    loyaltyPoints: 1250,
    memberSince: "January 2024",
    recentOrders: [
      { id: 12345, date: "Mar 15, 2026", status: "Delivered", total: 12500 },
      { id: 12344, date: "Mar 10, 2026", status: "Shipped", total: 8750 },
      { id: 12343, date: "Mar 5, 2026", status: "Delivered", total: 23400 },
    ]
  };

  const quickActions = [
    { icon: "🛒", label: "Place New Order", path: "/place-order", color: "#fbbf24" },
    { icon: "📦", label: "Track Orders", path: "/dashboard/track", color: "#10b981" },
    { icon: "❤️", label: "My Wishlist", path: "/dashboard/wishlist", color: "#ef4444" },
    { icon: "💬", label: "Support Chat", path: "/dashboard/chat", color: "#3b82f6" },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case "Delivered": return "#10b981";
      case "Shipped": return "#3b82f6";
      case "Processing": return "#f59e0b";
      case "Pending": return "#fbbf24";
      default: return "#6b7280";
    }
  };

  return (
    <div className="dashboard-home">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-content">
          <h1>Welcome back, {user?.name || "Customer"}! 👋</h1>
          <p>Here's what's happening with your account today.</p>
        </div>
        <div className="member-since">
          <span>Member since</span>
          <strong>{stats.memberSince}</strong>
        </div>
      </div>

      {/* Stats Cards - Customer Focused */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => navigate("/dashboard/orders")}>
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <span className="stat-label">Total Orders</span>
            <span className="stat-value">{stats.totalOrders}</span>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate("/dashboard/orders?filter=pending")}>
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <span className="stat-label">Pending Orders</span>
            <span className="stat-value">{stats.pendingOrders}</span>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate("/dashboard/wishlist")}>
          <div className="stat-icon">❤️</div>
          <div className="stat-content">
            <span className="stat-label">Wishlist Items</span>
            <span className="stat-value">{stats.wishlistItems}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <span className="stat-label">Loyalty Points</span>
            <span className="stat-value">{stats.loyaltyPoints}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="quick-action-card"
              onClick={() => navigate(action.path)}
              style={{ '--action-color': action.color }}
            >
              <span className="action-icon">{action.icon}</span>
              <span className="action-label">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="recent-orders-section">
        <div className="section-header">
          <h2>Recent Orders</h2>
          <button 
            className="view-all-btn"
            onClick={() => navigate("/dashboard/orders")}
          >
            View All Orders →
          </button>
        </div>

        <div className="recent-orders-list">
          {stats.recentOrders.map((order) => (
            <div 
              key={order.id} 
              className="recent-order-item"
              onClick={() => navigate(`/dashboard/track/${order.id}`)}
            >
              <div className="order-info">
                <span className="order-id">Order #{order.id}</span>
                <span className="order-date">{order.date}</span>
              </div>
              <div className="order-details">
                <span className="order-status" style={{ 
                  backgroundColor: `${getStatusColor(order.status)}20`,
                  color: getStatusColor(order.status),
                  border: `1px solid ${getStatusColor(order.status)}`
                }}>
                  {order.status}
                </span>
                <span className="order-total">₦{order.total.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Products / Personalized Suggestions */}
      <div className="recommendations-section">
        <h2>Recommended for You</h2>
        <div className="recommendations-grid">
          {[1, 2, 3].map((item) => (
            <div key={item} className="recommendation-card">
              <div className="rec-image">🥤</div>
              <div className="rec-details">
                <h4>Product Name</h4>
                <p className="rec-price">₦500</p>
                <button 
                  className="add-to-cart-small"
                  onClick={() => navigate("/place-order")}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;