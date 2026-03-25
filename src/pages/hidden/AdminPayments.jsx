// src/pages/hidden/AdminPayments.jsx
import React, { useState, useEffect } from "react";
import { getAllPayments, updatePaymentStatus } from "../../services/orderService"; // ✅ Import from service

function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Load payments on component mount
  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = () => {
    const allPayments = getAllPayments();
    console.log("💰 Loading payments:", allPayments);
    setPayments(allPayments);
    setFilteredPayments(allPayments);
  };

  // Filter payments based on status and search
  useEffect(() => {
    let filtered = [...payments];

    if (statusFilter !== "all") {
      filtered = filtered.filter(p => p.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.orderId?.toString().includes(searchTerm)
      );
    }

    setFilteredPayments(filtered);
  }, [payments, statusFilter, searchTerm]);

  const handleConfirmPayment = (orderId) => {
    updatePaymentStatus(orderId, "Paid");
    loadPayments(); // Reload to show updated status
  };

  const handleRefundPayment = (orderId) => {
    if (window.confirm("Process refund for this payment?")) {
      updatePaymentStatus(orderId, "Refunded");
      loadPayments();
    }
  };

  const calculateStats = () => {
    const total = payments.length;
    const paid = payments.filter(p => p.status === "Paid").length;
    const pending = payments.filter(p => p.status === "Pending").length;
    const refunded = payments.filter(p => p.status === "Refunded").length;
    const totalAmount = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const paidAmount = payments.filter(p => p.status === "Paid").reduce((sum, p) => sum + (p.amount || 0), 0);
    const pendingAmount = payments.filter(p => p.status === "Pending").reduce((sum, p) => sum + (p.amount || 0), 0);

    return { total, paid, pending, refunded, totalAmount, paidAmount, pendingAmount };
  };

  const stats = calculateStats();
  const formatNaira = (amount) => `₦${amount?.toLocaleString() || 0}`;

  return (
    <div className="admin-payments">
      <div className="payments-header">
        <h1>💰 Payment Management</h1>
        
        {/* Refresh button */}
        <button 
          onClick={loadPayments}
          style={{ padding: "8px 16px", background: "#3498db", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="payments-stats">
        <div className="stat-card">
          <span className="stat-label">Total Payments</span>
          <span className="stat-value">{stats.total}</span>
          <span className="stat-amount">{formatNaira(stats.totalAmount)}</span>
        </div>
        <div className="stat-card paid">
          <span className="stat-label">Paid</span>
          <span className="stat-value">{stats.paid}</span>
          <span className="stat-amount">{formatNaira(stats.paidAmount)}</span>
        </div>
        <div className="stat-card pending">
          <span className="stat-label">Pending</span>
          <span className="stat-value">{stats.pending}</span>
          <span className="stat-amount">{formatNaira(stats.pendingAmount)}</span>
        </div>
        <div className="stat-card refunded">
          <span className="stat-label">Refunded</span>
          <span className="stat-value">{stats.refunded}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search by customer or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label>Status</label>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="payments-table-container">
        {filteredPayments.length === 0 ? (
          <div className="no-payments">
            <p>No payment records found</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(payment => (
                <tr key={payment.orderId}>
                  <td>#{payment.orderId}</td>
                  <td>{payment.customer}</td>
                  <td className="amount">{formatNaira(payment.amount)}</td>
                  <td>
                    <span className={`status-badge ${payment.status.toLowerCase()}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td>{payment.date}</td>
                  <td>
                    {payment.status === "Pending" && (
                      <>
                        <button 
                          className="confirm-btn"
                          onClick={() => handleConfirmPayment(payment.orderId)}
                        >
                          Confirm
                        </button>
                        <button 
                          className="refund-btn"
                          onClick={() => handleRefundPayment(payment.orderId)}
                        >
                          Refund
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminPayments;