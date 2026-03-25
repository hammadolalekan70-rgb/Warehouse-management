// src/pages/TrackOrderPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getOrdersByCustomer } from "../services/orderService";

function TrackOrderPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadOrders();
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  const loadOrders = () => {
    setLoading(true);
    const customerOrders = getOrdersByCustomer(user?.email);
    setOrders(customerOrders);
    
    // If orderId is in URL, find that order
    if (orderId) {
      const order = customerOrders.find(o => o.id.toString() === orderId);
      if (order) {
        setSelectedOrder(order);
      }
    }
    
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const order = orders.find(o => o.id.toString() === searchId);
    if (order) {
      setSelectedOrder(order);
    } else {
      alert("Order not found");
    }
  };

  const getStatusProgress = (status) => {
    const steps = ["Pending", "Processing", "Shipped", "Delivered"];
    const index = steps.indexOf(status);
    return ((index + 1) / steps.length) * 100;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Pending": return "#fcd34d";
      case "Processing": return "#93c5fd";
      case "Shipped": return "#c4b5fd";
      case "Delivered": return "#6ee7b7";
      default: return "#fcd34d";
    }
  };

  const formatNaira = (amount) => {
    return `₦${amount?.toLocaleString() || 0}`;
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="track-order-page">
      <h1>Track Your Order</h1>

      {/* Search Bar */}
      <div className="track-search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter Order ID to track..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button type="submit">Track Order</button>
        </form>
      </div>

      {/* Recent Orders List */}
      {!selectedOrder && (
        <div className="recent-orders-list">
          <h2>Your Recent Orders</h2>
          {orders.length === 0 ? (
            <p className="no-orders">You haven't placed any orders yet.</p>
          ) : (
            <div className="orders-mini-grid">
              {orders.slice(0, 5).map(order => (
                <div 
                  key={order.id} 
                  className="order-mini-card"
                  onClick={() => setSelectedOrder(order)}
                >
                  <span className="order-id">#{order.id}</span>
                  <span className="order-date">{order.date}</span>
                  <span className="order-status" style={{
                    background: `${getStatusColor(order.status)}20`,
                    color: getStatusColor(order.status)
                  }}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tracked Order Details */}
      {selectedOrder && (
        <div className="tracked-order">
          <button 
            className="back-btn"
            onClick={() => setSelectedOrder(null)}
          >
            ← Back to List
          </button>

          <div className="order-track-card">
            <div className="order-header">
              <h2>Order #{selectedOrder.id}</h2>
              <span className="order-status-large" style={{
                background: `${getStatusColor(selectedOrder.status)}20`,
                color: getStatusColor(selectedOrder.status)
              }}>
                {selectedOrder.status}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="tracking-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${getStatusProgress(selectedOrder.status)}%` }}
                ></div>
              </div>
              <div className="progress-steps">
                <span className={selectedOrder.status === "Pending" ? "active" : ""}>Pending</span>
                <span className={selectedOrder.status === "Processing" ? "active" : ""}>Processing</span>
                <span className={selectedOrder.status === "Shipped" ? "active" : ""}>Shipped</span>
                <span className={selectedOrder.status === "Delivered" ? "active" : ""}>Delivered</span>
              </div>
            </div>

            {/* Order Details */}
            <div className="order-details">
              <div className="detail-row">
                <span className="label">Order Date:</span>
                <span className="value">{selectedOrder.date}</span>
              </div>
              <div className="detail-row">
                <span className="label">Customer Name:</span>
                <span className="value">{selectedOrder.customerName}</span>
              </div>
              <div className="detail-row">
                <span className="label">Email:</span>
                <span className="value">{selectedOrder.customerEmail}</span>
              </div>
              <div className="detail-row">
                <span className="label">Phone:</span>
                <span className="value">{selectedOrder.customerPhone}</span>
              </div>
              <div className="detail-row">
                <span className="label">Delivery Address:</span>
                <span className="value">{selectedOrder.customerAddress}</span>
              </div>
              <div className="detail-row">
                <span className="label">Delivery Method:</span>
                <span className="value">{selectedOrder.deliveryMethod || "Standard"}</span>
              </div>
            </div>

            {/* Order Items */}
            <div className="order-items">
              <h3>Order Items</h3>
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{formatNaira(item.price)}</td>
                      <td>{formatNaira(item.quantity * item.price)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-right">Subtotal:</td>
                    <td>{formatNaira(selectedOrder.subtotal)}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="text-right">Shipping:</td>
                    <td>{formatNaira(selectedOrder.shipping)}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="text-right">Tax:</td>
                    <td>{formatNaira(selectedOrder.tax)}</td>
                  </tr>
                  <tr className="total-row">
                    <td colSpan="3" className="text-right">Total:</td>
                    <td><strong>{formatNaira(selectedOrder.total)}</strong></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {selectedOrder.notes && (
              <div className="order-notes">
                <h3>Order Notes</h3>
                <p>{selectedOrder.notes}</p>
              </div>
            )}

            <button 
              className="contact-support-btn"
              onClick={() => navigate("/dashboard/chat")}
            >
              Contact Support
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrackOrderPage;