// src/pages/hidden/AdminOrders.jsx (UPDATED with CSS classes)
import React, { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "../../services/orderService";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    const allOrders = getAllOrders();
    console.log("📋 Loading orders:", allOrders);
    setOrders(allOrders);
    setLoading(false);
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    loadOrders();
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const formatNaira = (amount) => {
    return `₦${amount?.toLocaleString() || 0}`;
  };

  const getStatusClass = (status) => {
    switch(status) {
      case "Pending": return "Pending";
      case "Processing": return "Processing";
      case "Shipped": return "Shipped";
      case "Delivered": return "Delivered";
      case "Cancelled": return "Cancelled";
      default: return "";
    }
  };

  if (loading) {
    return (
      <div className="orders-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-orders">
      <div className="orders-header">
        <h1>📋 Order Management</h1>
        <button onClick={loadOrders} className="refresh-btn">
          🔄 Refresh Orders
        </button>
      </div>

      <div className="orders-stats">
        <div className="stat-item">
          <span className="stat-label">Total Orders:</span>
          <span className="stat-value">{orders.length}</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <h2>📦 No orders yet</h2>
          <p>When customers place orders, they will appear here.</p>
        </div>
      ) : (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
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
                      className={`status-select ${getStatusClass(order.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <button 
                      onClick={() => handleViewOrder(order)}
                      className="view-btn"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="order-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="order-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details #{selectedOrder.id}</h2>
              <button className="modal-close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            
            <div className="modal-body">
              {/* Customer Information */}
              <div className="customer-info-section">
                <h3>Customer Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Name</span>
                    <span className="info-value">{selectedOrder.customerName}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{selectedOrder.customerEmail}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Phone</span>
                    <span className="info-value">{selectedOrder.customerPhone}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Delivery Method</span>
                    <span className="info-value">{selectedOrder.deliveryMethod || "Standard"}</span>
                  </div>
                  <div className="info-item full-width">
                    <span className="info-label">Address</span>
                    <span className="info-value">{selectedOrder.customerAddress}</span>
                  </div>
                  {selectedOrder.notes && (
                    <div className="info-item full-width">
                      <span className="info-label">Notes</span>
                      <span className="info-value">{selectedOrder.notes}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="order-items-section">
                <h3>Order Items</h3>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td style={{ textAlign: "center" }}>{item.quantity}</td>
                        <td>{formatNaira(item.price)}</td>
                        <td>{formatNaira(item.quantity * item.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" style={{ textAlign: "right" }}>Subtotal:</td>
                      <td>{formatNaira(selectedOrder.subtotal)}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" style={{ textAlign: "right" }}>Shipping:</td>
                      <td>{formatNaira(selectedOrder.shipping)}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" style={{ textAlign: "right" }}>Tax:</td>
                      <td>{formatNaira(selectedOrder.tax)}</td>
                    </tr>
                    <tr className="total-row">
                      <td colSpan="3" style={{ textAlign: "right" }}><strong>Total:</strong></td>
                      <td><strong>{formatNaira(selectedOrder.total)}</strong></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Modal Actions */}
              <div className="modal-actions">
                <button 
                  onClick={() => {
                    handleStatusChange(selectedOrder.id, "Processing");
                    setShowModal(false);
                  }}
                  className="action-btn process"
                >
                  Process
                </button>
                <button 
                  onClick={() => {
                    handleStatusChange(selectedOrder.id, "Shipped");
                    setShowModal(false);
                  }}
                  className="action-btn ship"
                >
                  Ship
                </button>
                <button 
                  onClick={() => {
                    handleStatusChange(selectedOrder.id, "Delivered");
                    setShowModal(false);
                  }}
                  className="action-btn deliver"
                >
                  Deliver
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="action-btn close"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;