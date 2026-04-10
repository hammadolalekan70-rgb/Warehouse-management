// src/pages/PaymentPage.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [amount, setAmount] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    accountName: "",
    bankName: ""
  });
  const [ussdCode, setUssdCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentHistory, setPaymentHistory] = useState([]);

  // Load payment history from localStorage
  useEffect(() => {
    const savedPayments = localStorage.getItem(`payments_${user?.email}`);
    if (savedPayments) {
      setPaymentHistory(JSON.parse(savedPayments));
    } else {
      // Mock payment history
      setPaymentHistory([
        { id: 1, orderId: "ORD-001", amount: 12500, date: "2024-03-25", status: "Completed", method: "Card" },
        { id: 2, orderId: "ORD-002", amount: 8000, date: "2024-03-20", status: "Completed", method: "Bank Transfer" },
        { id: 3, orderId: "ORD-003", amount: 4500, date: "2024-03-15", status: "Completed", method: "USSD" },
      ]);
    }
  }, [user]);

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "cardNumber") {
      // Format card number with spaces every 4 digits
      let formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      setCardDetails({ ...cardDetails, [name]: formatted });
    } else {
      setCardDetails({ ...cardDetails, [name]: value });
    }
  };

  const handleBankInputChange = (e) => {
    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      setPaymentError("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setPaymentError("");

    // Simulate payment processing
    setTimeout(() => {
      // Validate based on payment method
      let isValid = true;
      
      if (paymentMethod === "card") {
        if (cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
          setPaymentError("Invalid card number");
          isValid = false;
        } else if (!cardDetails.cardName) {
          setPaymentError("Please enter cardholder name");
          isValid = false;
        } else if (cardDetails.expiryDate.length !== 5) {
          setPaymentError("Invalid expiry date (MM/YY)");
          isValid = false;
        } else if (cardDetails.cvv.length !== 3) {
          setPaymentError("Invalid CVV");
          isValid = false;
        }
      } else if (paymentMethod === "bank") {
        if (bankDetails.accountNumber.length !== 10) {
          setPaymentError("Invalid account number (10 digits)");
          isValid = false;
        } else if (!bankDetails.accountName) {
          setPaymentError("Please enter account name");
          isValid = false;
        } else if (!bankDetails.bankName) {
          setPaymentError("Please select bank");
          isValid = false;
        }
      } else if (paymentMethod === "ussd") {
        if (!ussdCode) {
          setPaymentError("Please enter USSD code");
          isValid = false;
        }
      }

      if (isValid) {
        // Process payment
        const newPayment = {
          id: paymentHistory.length + 1,
          orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
          amount: parseFloat(amount),
          date: new Date().toISOString().split('T')[0],
          status: "Completed",
          method: paymentMethod === "card" ? "Card" : paymentMethod === "bank" ? "Bank Transfer" : "USSD"
        };
        
        setPaymentHistory([newPayment, ...paymentHistory]);
        localStorage.setItem(`payments_${user?.email}`, JSON.stringify([newPayment, ...paymentHistory]));
        
        setPaymentSuccess(true);
        setTimeout(() => {
          setPaymentSuccess(false);
          setAmount("");
          setCardDetails({ cardNumber: "", cardName: "", expiryDate: "", cvv: "" });
          setBankDetails({ accountNumber: "", accountName: "", bankName: "" });
          setUssdCode("");
        }, 3000);
      }
      
      setLoading(false);
    }, 2000);
  };

  const formatNaira = (amount) => {
    return `₦${amount.toLocaleString('en-NG')}`;
  };

  const paymentMethods = [
    { id: "card", name: "💳 Card Payment", icon: "💳", description: "Visa, Mastercard, Verve" },
    { id: "bank", name: "🏦 Bank Transfer", icon: "🏦", description: "Direct bank transfer" },
    { id: "ussd", name: "📱 USSD Code", icon: "📱", description: "Quick USSD payment" },
  ];

  return (
    <div className="payment-page">
      <div className="payment-header">
        <h1>💳 Make a Payment</h1>
        <p>Complete your order payment securely</p>
      </div>

      {paymentSuccess && (
        <div className="payment-success-alert">
          <span>✅</span>
          <p>Payment successful! Your transaction has been completed.</p>
        </div>
      )}

      <div className="payment-grid">
        {/* Payment Form */}
        <div className="payment-form-container">
          <h2>Payment Details</h2>
          
          {/* Payment Method Selection */}
          <div className="payment-methods">
            {paymentMethods.map(method => (
              <div
                key={method.id}
                className={`payment-method ${paymentMethod === method.id ? 'active' : ''}`}
                onClick={() => setPaymentMethod(method.id)}
              >
                <div className="method-icon">{method.icon}</div>
                <div className="method-info">
                  <h4>{method.name}</h4>
                  <p>{method.description}</p>
                </div>
                {paymentMethod === method.id && <div className="method-check">✓</div>}
              </div>
            ))}
          </div>

          <form onSubmit={handlePayment}>
            <div className="form-group">
              <label>Amount to Pay</label>
              <div className="amount-input-wrapper">
                <span className="currency-symbol">₦</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  step="100"
                  min="100"
                  required
                />
              </div>
            </div>

            {paymentMethod === "card" && (
              <div className="card-details">
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    name="cardName"
                    value={cardDetails.cardName}
                    onChange={handleCardInputChange}
                    placeholder="Name on card"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={handleCardInputChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="password"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardInputChange}
                      placeholder="123"
                      maxLength="3"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "bank" && (
              <div className="bank-details">
                <div className="form-group">
                  <label>Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={bankDetails.accountNumber}
                    onChange={handleBankInputChange}
                    placeholder="0123456789"
                    maxLength="10"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Account Name</label>
                  <input
                    type="text"
                    name="accountName"
                    value={bankDetails.accountName}
                    onChange={handleBankInputChange}
                    placeholder="Account holder name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Bank Name</label>
                  <select
                    name="bankName"
                    value={bankDetails.bankName}
                    onChange={handleBankInputChange}
                    required
                  >
                    <option value="">Select Bank</option>
                    <option value="Access Bank">Access Bank</option>
                    <option value="GTBank">GTBank</option>
                    <option value="First Bank">First Bank</option>
                    <option value="UBA">UBA</option>
                    <option value="Zenith Bank">Zenith Bank</option>
                    <option value="Fidelity Bank">Fidelity Bank</option>
                  </select>
                </div>
              </div>
            )}

            {paymentMethod === "ussd" && (
              <div className="ussd-details">
                <div className="form-group">
                  <label>USSD Code</label>
                  <input
                    type="text"
                    value={ussdCode}
                    onChange={(e) => setUssdCode(e.target.value)}
                    placeholder="*894*amount*account#"
                    required
                  />
                </div>
                <div className="ussd-info">
                  <p>📱 Dial the USSD code on your phone and follow the prompt</p>
                  <p className="ussd-example">Example: *894*1000*123456789#</p>
                </div>
              </div>
            )}

            {paymentError && <div className="payment-error">{paymentError}</div>}

            <button type="submit" className="pay-now-btn" disabled={loading}>
              {loading ? "Processing..." : `Pay ${amount ? formatNaira(amount) : "Now"}`}
            </button>
          </form>
        </div>

        {/* Payment History */}
        <div className="payment-history-container">
          <h2>Payment History</h2>
          <div className="payment-history-list">
            {paymentHistory.length > 0 ? (
              paymentHistory.map(payment => (
                <div key={payment.id} className="payment-history-item">
                  <div className="history-icon">
                    {payment.method === "Card" ? "💳" : payment.method === "Bank Transfer" ? "🏦" : "📱"}
                  </div>
                  <div className="history-details">
                    <p className="history-order">{payment.orderId}</p>
                    <p className="history-date">{payment.date}</p>
                    <p className="history-method">{payment.method}</p>
                  </div>
                  <div className="history-amount">
                    <p className="amount-value">{formatNaira(payment.amount)}</p>
                    <span className="status-completed">✓ {payment.status}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-history">
                <p>No payment history yet</p>
                <span>Make your first payment</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Info Cards */}
      <div className="payment-info-cards">
        <div className="info-card">
          <span className="info-icon">🔒</span>
          <h4>Secure Payment</h4>
          <p>Your payment information is encrypted and secure</p>
        </div>
        <div className="info-card">
          <span className="info-icon">⚡</span>
          <h4>Instant Processing</h4>
          <p>Payments are processed immediately</p>
        </div>
        <div className="info-card">
          <span className="info-icon">📱</span>
          <h4>Multiple Methods</h4>
          <p>Choose from card, bank transfer, or USSD</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;