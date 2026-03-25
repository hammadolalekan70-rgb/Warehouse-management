// src/pages/AdminPage.jsx
import React, { useState, useEffect } from "react";
import { useOrders } from "../contexts/OrderContext";

function AdminPage() {
  const { orders, payments, updateOrderStatus, updatePaymentStatus } = useOrders();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Debug: Log orders whenever they change
  useEffect(() => {
    console.log("AdminPage - Current orders:", orders);
    console.log("AdminPage - Total orders count:", orders.length);
  }, [orders]);

  // Filter orders
  useEffect(() => {
    let filtered = [...orders];
    
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm)
      );
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  // Calculate statistics
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "Pending").length,
    processing: orders.filter(o => o.status === "Processing").length,
    shipped: orders.filter(o => o.status === "Shipped").length,
    delivered: orders.filter(o => o.status === "Delivered").length,
    cancelled: orders.filter(o => o.status === "Cancelled").length,
    revenue: payments.filter(p => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0),
    pendingRevenue: payments.filter(p => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0)
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (newStatus === "Delivered") {
      updatePaymentStatus(orderId, "Paid");
    }
  };

  const formatNaira = (amount) => {
    return `₦${amount?.toLocaleString() || 0}`;
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <h3>Total Orders</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card pending">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>
        <div className="stat-card processing">
          <h3>Processing</h3>
          <p>{stats.processing}</p>
        </div>
        <div className="stat-card shipped">
          <h3>Shipped</h3>
          <p>{stats.shipped}</p>
        </div>
        <div className="stat-card delivered">
          <h3>Delivered</h3>
          <p>{stats.delivered}</p>
        </div>
        <div className="stat-card revenue">
          <h3>Revenue</h3>
          <p>{formatNaira(stats.revenue)}</p>
        </div>
      </div>

      {/* Debug Info - Remove after testing */}
      <div style={{ background: "#f0f0f0", padding: "10px", marginBottom: "20px" }}>
        <strong>Debug:</strong> Total orders in system: {orders.length}
        {orders.length === 0 && (
          <p style={{ color: "red" }}>No orders found! Place an order first.</p>
        )}
      </div>

      {/* Filters */}
      <div className="filters-section">
        <input
          type="text"
          placeholder="Search by customer name or order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <div className="no-orders">
          <p>No orders to display.</p>
          {orders.length === 0 ? (
            <p>No orders have been placed yet. Go to <strong>Place Order</strong> to create an order.</p>
          ) : (
            <p>No orders match your filters.</p>
          )}
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.customerEmail}</td>
                <td>{order.items?.length || 0}</td>
                <td>{formatNaira(order.total)}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    style={{
                      padding: "5px",
                      borderRadius: "4px",
                      background: order.status === "Pending" ? "#fff3cd" : 
                                 order.status === "Processing" ? "#cce5ff" :
                                 order.status === "Shipped" ? "#d4edda" :
                                 order.status === "Delivered" ? "#d1ecf1" : "#f8d7da"
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <span style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    background: order.paymentStatus === "Paid" ? "#d4edda" : "#fff3cd",
                    color: order.paymentStatus === "Paid" ? "#155724" : "#856404"
                  }}>
                    {order.paymentStatus || "Pending"}
                  </span>
                </td>
                <td>{order.date}</td>
                <td>
                  <button className="view-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPage;