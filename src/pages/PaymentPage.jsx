// src/pages/PaymentPage.jsx
import React, { useState, useEffect } from "react";

function PaymentPage() {
  // Load payments from localStorage or create mock data
  const [payments, setPayments] = useState(
    JSON.parse(localStorage.getItem("payments")) || [
      { orderId: 101, customer: "Alice", amount: 12000, status: "Pending" }, // Changed to Naira amounts
      { orderId: 102, customer: "Bob", amount: 8000, status: "Paid" },
      { orderId: 103, customer: "Charlie", amount: 20000, status: "Pending" },
      { orderId: 104, customer: "John", amount: 15000, status: "Paid" },
      { orderId: 105, customer: "Jane", amount: 25000, status: "Pending" },
    ]
  );

  const confirmPayment = (orderId) => {
    const updated = payments.map((p) =>
      p.orderId === orderId ? { ...p, status: "Paid" } : p
    );
    setPayments(updated);
    localStorage.setItem("payments", JSON.stringify(updated));
  };

  // Calculate statistics
  const totalOrders = payments.length;
  const pendingPayments = payments.filter(p => p.status === "Pending").length;
  const paidPayments = payments.filter(p => p.status === "Paid").length;
  const totalRevenue = payments.reduce((acc, p) => acc + p.amount, 0);
  const pendingAmount = payments
    .filter(p => p.status === "Pending")
    .reduce((acc, p) => acc + p.amount, 0);
  const paidAmount = payments
    .filter(p => p.status === "Paid")
    .reduce((acc, p) => acc + p.amount, 0);

  // Format currency in Naira
  const formatNaira = (amount) => {
    return `₦${amount.toLocaleString('en-NG')}`;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Payment Dashboard</h1>

      {/* Statistics Cards */}
      <div style={styles.cardsGrid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Orders</h3>
          <p style={styles.cardValue}>{totalOrders}</p>
          <p style={styles.cardSubtext}>All time</p>
        </div>
        
        <div style={{...styles.card, ...styles.pendingCard}}>
          <h3 style={styles.cardTitle}>Pending Payments</h3>
          <p style={styles.cardValue}>{pendingPayments}</p>
          <p style={styles.cardSubtext}>{formatNaira(pendingAmount)}</p>
        </div>
        
        <div style={{...styles.card, ...styles.paidCard}}>
          <h3 style={styles.cardTitle}>Paid Payments</h3>
          <p style={styles.cardValue}>{paidPayments}</p>
          <p style={styles.cardSubtext}>{formatNaira(paidAmount)}</p>
        </div>
        
        <div style={{...styles.card, ...styles.revenueCard}}>
          <h3 style={styles.cardTitle}>Total Revenue</h3>
          <p style={styles.cardValue}>{formatNaira(totalRevenue)}</p>
          <p style={styles.cardSubtext}>All time</p>
        </div>
      </div>

      {/* Payments Table */}
      <div style={styles.tableContainer}>
        <h2 style={styles.tableHeader}>Payment History</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>Customer</th>
              <th style={styles.th}>Amount (₦)</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.orderId} style={styles.tr}>
                <td style={styles.td}>#{p.orderId}</td>
                <td style={styles.td}>{p.customer}</td>
                <td style={styles.td}>
                  <span style={styles.amount}>{formatNaira(p.amount)}</span>
                </td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.statusBadge,
                    ...(p.status === "Paid" ? styles.statusPaid : styles.statusPending)
                  }}>
                    {p.status}
                  </span>
                </td>
                <td style={styles.td}>
                  {p.status === "Pending" && (
                    <button 
                      style={styles.confirmButton} 
                      onClick={() => confirmPayment(p.orderId)}
                      onMouseEnter={(e) => e.target.style.background = styles.confirmButtonHover.background}
                      onMouseLeave={(e) => e.target.style.background = styles.confirmButton.background}
                    >
                      ✓ Confirm Payment
                    </button>
                  )}
                  {p.status === "Paid" && (
                    <span style={styles.paidBadge}>✓ Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {payments.length === 0 && (
          <div style={styles.noData}>
            <p>No payment records found</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Styles object
const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "30px",
    color: "#333",
    fontSize: "2rem",
    fontWeight: "600",
    textAlign: "center",
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
    transition: "transform 0.3s, boxShadow 0.3s",
    cursor: "pointer",
  },
  pendingCard: {
    borderLeft: "4px solid #ffc107",
  },
  paidCard: {
    borderLeft: "4px solid #28a745",
  },
  revenueCard: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
  },
  cardTitle: {
    margin: "0 0 10px 0",
    fontSize: "1rem",
    color: "#666",
    fontWeight: "500",
  },
  cardValue: {
    margin: "0 0 5px 0",
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
  },
  cardSubtext: {
    margin: 0,
    fontSize: "0.9rem",
    color: "#999",
  },
  tableContainer: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  tableHeader: {
    margin: "0 0 20px 0",
    color: "#333",
    fontSize: "1.3rem",
    fontWeight: "600",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    borderBottom: "2px solid #e0e0e0",
    padding: "15px 12px",
    textAlign: "left",
    color: "#666",
    fontWeight: "600",
    fontSize: "0.95rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  td: {
    padding: "15px 12px",
    textAlign: "left",
    borderBottom: "1px solid #f0f0f0",
    color: "#333",
  },
  tr: {
    transition: "background 0.3s",
  },
  amount: {
    fontWeight: "600",
    color: "#28a745",
  },
  statusBadge: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
    display: "inline-block",
  },
  statusPending: {
    background: "#fff3cd",
    color: "#856404",
  },
  statusPaid: {
    background: "#d4edda",
    color: "#155724",
  },
  confirmButton: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    background: "#28a745",
    color: "#fff",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "background 0.3s, transform 0.2s",
  },
  confirmButtonHover: {
    background: "#218838",
  },
  paidBadge: {
    padding: "6px 12px",
    background: "#d4edda",
    color: "#155724",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
    display: "inline-block",
  },
  noData: {
    textAlign: "center",
    padding: "40px",
    color: "#999",
    fontSize: "1.1rem",
  },
};

export default PaymentPage;