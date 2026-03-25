import React, { useState } from "react";

const cardStyle = {
  background: "#fff",
  padding: "15px",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
};

function PaymentPage() {
  const [payments, setPayments] = useState(
    JSON.parse(localStorage.getItem("payments")) || [
      { orderId: 101, customer: "Alice", amount: 120, status: "Pending" },
      { orderId: 102, customer: "Bob", amount: 80, status: "Paid" },
    ]
  );

  const confirmPayment = (orderId) => {
    const updated = payments.map((p) =>
      p.orderId === orderId ? { ...p, status: "Paid" } : p
    );
    setPayments(updated);
    localStorage.setItem("payments", JSON.stringify(updated));
  };

  return (
    <div>
      <h1>Payment Dashboard</h1>

      {/* Cards showing total/paid/pending */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <div style={cardStyle}>
          <h3>Total Orders</h3>
          <p>{payments.length}</p>
        </div>
        <div style={cardStyle}>
          <h3>Pending Payments</h3>
          <p>{payments.filter((p) => p.status === "Pending").length}</p>
        </div>
        <div style={cardStyle}>
          <h3>Paid Payments</h3>
          <p>{payments.filter((p) => p.status === "Paid").length}</p>
        </div>
      </div>

      {/* Payment Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.orderId} style={{ textAlign: "center", borderBottom: "1px solid #ccc" }}>
              <td>{p.orderId}</td>
              <td>{p.customer}</td>
              <td>${p.amount}</td>
              <td>{p.status}</td>
              <td>
                {p.status === "Pending" && (
                  <button onClick={() => confirmPayment(p.orderId)}>Confirm</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentPage;