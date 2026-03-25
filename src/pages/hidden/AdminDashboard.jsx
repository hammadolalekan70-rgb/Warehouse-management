// src/pages/hidden/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getAllOrders, getAllPayments } from "../../services/orderService"; // ✅ Import from service
import { useChat } from "../../contexts/ChatContext";

function AdminDashboard() {
  const { user, logout } = useAuth();
  const { unreadCount } = useChat();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    const allOrders = getAllOrders();
    const allPayments = getAllPayments();
    console.log("📊 Admin Dashboard - Orders:", allOrders);
    console.log("📊 Admin Dashboard - Payments:", allPayments);
    setOrders(allOrders);
    setPayments(allPayments);
    setLoading(false);
  };

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o?.status === "Pending").length,
    totalRevenue: payments.filter(p => p?.status === "Paid").reduce((sum, p) => sum + (p?.amount || 0), 0),
    pendingPayments: payments.filter(p => p?.status === "Pending").length,
    unreadMessages: unreadCount
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return <div style={{ padding: "50px", textAlign: "center" }}>Loading dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-profile">
          <h3>Welcome, {user?.name}!</h3>
          <p>Administrator</p>
        </div>
        
        <nav className="admin-nav">
          <Link to="/hidden-admin-portal/dashboard">📊 Dashboard</Link>
          <Link to="/hidden-admin-portal/orders">📋 Orders ({stats.totalOrders})</Link>
          <Link to="/hidden-admin-portal/products">📦 Products</Link>
          <Link to="/hidden-admin-portal/payments">💰 Payments</Link>
          <Link to="/hidden-admin-portal/chat" className={unreadCount > 0 ? "has-unread" : ""}>
            💬 Customer Chat {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
          </Link>
        </nav>
        
        <button onClick={handleLogout} className="admin-logout">
          🚪 Logout
        </button>
      </div>

      <div className="admin-content">
        <h1>Admin Dashboard</h1>
        
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>{stats.totalOrders}</p>
          </div>
          <div className="stat-card">
            <h3>Pending Orders</h3>
            <p>{stats.pendingOrders}</p>
          </div>
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p>₦{stats.totalRevenue.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <h3>Pending Payments</h3>
            <p>{stats.pendingPayments}</p>
          </div>
          <div className="stat-card highlight">
            <h3>Unread Messages</h3>
            <p>{stats.unreadMessages}</p>
          </div>
        </div>

        {/* Recent Orders Preview */}
        <div className="recent-orders">
          <h2>Recent Orders</h2>
          {orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map(order => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customerName || "N/A"}</td>
                    <td>₦{order.total?.toLocaleString() || 0}</td>
                    <td>
                      <span className={`status-badge ${order.status?.toLowerCase()}`}>
                        {order.status || "Pending"}
                      </span>
                    </td>
                    <td>{order.date || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <Link to="/hidden-admin-portal/orders" className="view-all-link">
            View All Orders →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;