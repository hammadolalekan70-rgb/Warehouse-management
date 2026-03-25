// src/pages/hidden/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("🔐 AdminLogin - Attempting login with:", email);
      const result = await login(email, password);
      console.log("🔐 AdminLogin - Login result:", result);
      
      // Check if user is admin
      if (result.user.role === "admin") {
        console.log("🔐 AdminLogin - Redirecting to admin dashboard");
        navigate("/hidden-admin-portal/dashboard");
      } else {
        console.log("🔐 AdminLogin - User is not admin");
        setError("Access denied. Admin only.");
      }
    } catch (err) {
      console.error("🔐 AdminLogin - Error:", err);
      setError("Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2>Admin Portal</h2>
        <p className="admin-note">This area is restricted to administrators only.</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@hazan.com"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Access Admin Dashboard"}
          </button>
        </form>

        <div className="admin-hint">
          <p>Demo Admin Credentials:</p>
          <p>Email: <strong>admin@hazan.com</strong></p>
          <p>Password: <strong>Admin@123</strong></p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;