// src/pages/hidden/AdminOrders.jsx
import React, { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "../../services/orderService";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Load orders on component mount
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const allOrders = getAllOrders();
    console.log("📋 Loading orders:", allOrders);
    setOrders(allOrders);
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    loadOrders(); // Reload to show updated status
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const formatNaira = (amount) => {
    return `₦${amount?.toLocaleString() || 0}`;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Pending": return { bg: "#fff3cd", color: "#856404" };
      case "Processing": return { bg: "#cce5ff", color: "#004085" };
      case "Shipped": return { bg: "#d4edda", color: "#155724" };
      case "Delivered": return { bg: "#d1ecf1", color: "#0c5460" };
      case "Cancelled": return { bg: "#f8d7da", color: "#721c24" };
      default: return { bg: "#e2e3e5", color: "#383d41" };
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📋 Order Management</h1>
      
      {/* Refresh button */}
      <button 
        onClick={loadOrders}
        style={{ padding: "10px", marginBottom: "20px", background: "#3498db", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        🔄 Refresh Orders
      </button>

      <div style={{ background: "#f0f0f0", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <p><strong>Total Orders:</strong> {orders.length}</p>
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px", color: "#999" }}>
          <h2>No orders yet</h2>
          <p>When customers place orders, they will appear here.</p>
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", background: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
          <thead>
            <tr style={{ background: "#2c3e50", color: "white" }}>
              <th style={{ padding: "12px" }}>Order ID</th>
              <th style={{ padding: "12px" }}>Customer</th>
              <th style={{ padding: "12px" }}>Email</th>
              <th style={{ padding: "12px" }}>Items</th>
              <th style={{ padding: "12px" }}>Total</th>
              <th style={{ padding: "12px" }}>Status</th>
              <th style={{ padding: "12px" }}>Date</th>
              <th style={{ padding: "12px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => {
              const statusColors = getStatusColor(order.status);
              return (
                <tr key={order.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px" }}>#{order.id}</td>
                  <td style={{ padding: "12px" }}>{order.customerName}</td>
                  <td style={{ padding: "12px" }}>{order.customerEmail}</td>
                  <td style={{ padding: "12px" }}>{order.items?.length || 0}</td>
                  <td style={{ padding: "12px" }}>{formatNaira(order.total)}</td>
                  <td style={{ padding: "12px" }}>
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{
                        padding: "5px",
                        borderRadius: "4px",
                        background: statusColors.bg,
                        color: statusColors.color,
                        border: "none",
                        cursor: "pointer"
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td style={{ padding: "12px" }}>{order.date}</td>
                  <td style={{ padding: "12px" }}>
                    <button 
                      onClick={() => handleViewOrder(order)}
                      style={{
                        padding: "5px 10px",
                        background: "#3498db",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: "white",
            padding: "30px",
            borderRadius: "10px",
            maxWidth: "600px",
            width: "90%",
            maxHeight: "80vh",
            overflowY: "auto"
          }} onClick={e => e.stopPropagation()}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2>Order Details #{selectedOrder.id}</h2>
              <button 
                onClick={() => setShowModal(false)}
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            {/* Customer Information */}
            <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
              <h3 style={{ marginTop: 0 }}>Customer Information</h3>
              <p><strong>Name:</strong> {selectedOrder.customerName}</p>
              <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
              <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
              <p><strong>Address:</strong> {selectedOrder.customerAddress}</p>
              <p><strong>Delivery Method:</strong> {selectedOrder.deliveryMethod || "Standard"}</p>
              {selectedOrder.notes && (
                <p><strong>Notes:</strong> {selectedOrder.notes}</p>
              )}
            </div>

            {/* Order Items */}
            <div style={{ marginBottom: "20px" }}>
              <h3>Order Items</h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#2c3e50", color: "white" }}>
                    <th style={{ padding: "8px", textAlign: "left" }}>Product</th>
                    <th style={{ padding: "8px", textAlign: "center" }}>Qty</th>
                    <th style={{ padding: "8px", textAlign: "right" }}>Price</th>
                    <th style={{ padding: "8px", textAlign: "right" }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items?.map((item, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "8px" }}>{item.name}</td>
                      <td style={{ padding: "8px", textAlign: "center" }}>{item.quantity}</td>
                      <td style={{ padding: "8px", textAlign: "right" }}>{formatNaira(item.price)}</td>
                      <td style={{ padding: "8px", textAlign: "right" }}>{formatNaira(item.quantity * item.price)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" style={{ padding: "8px", textAlign: "right" }}><strong>Subtotal:</strong></td>
                    <td style={{ padding: "8px", textAlign: "right" }}>{formatNaira(selectedOrder.subtotal)}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" style={{ padding: "8px", textAlign: "right" }}><strong>Shipping:</strong></td>
                    <td style={{ padding: "8px", textAlign: "right" }}>{formatNaira(selectedOrder.shipping)}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" style={{ padding: "8px", textAlign: "right" }}><strong>Tax:</strong></td>
                    <td style={{ padding: "8px", textAlign: "right" }}>{formatNaira(selectedOrder.tax)}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" style={{ padding: "8px", textAlign: "right" }}><strong>Total:</strong></td>
                    <td style={{ padding: "8px", textAlign: "right" }}><strong>{formatNaira(selectedOrder.total)}</strong></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Order Status */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button 
                onClick={() => {
                  handleStatusChange(selectedOrder.id, "Processing");
                  setShowModal(false);
                }}
                style={{ padding: "8px 16px", background: "#17a2b8", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
              >
                Process
              </button>
              <button 
                onClick={() => {
                  handleStatusChange(selectedOrder.id, "Shipped");
                  setShowModal(false);
                }}
                style={{ padding: "8px 16px", background: "#ffc107", color: "black", border: "none", borderRadius: "4px", cursor: "pointer" }}
              >
                Ship
              </button>
              <button 
                onClick={() => {
                  handleStatusChange(selectedOrder.id, "Delivered");
                  setShowModal(false);
                }}
                style={{ padding: "8px 16px", background: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
              >
                Deliver
              </button>
              <button 
                onClick={() => setShowModal(false)}
                style={{ padding: "8px 16px", background: "#6c757d", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;