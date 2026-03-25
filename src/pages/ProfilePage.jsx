// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Profile form state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: ""
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Order history state
  const [recentOrders, setRecentOrders] = useState([]);

  // Load user data
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        postalCode: user.postalCode || ""
      });

      // Load user's orders from localStorage
      const userOrders = JSON.parse(localStorage.getItem(`orders_${user.email}`)) || [];
      setRecentOrders(userOrders.slice(0, 5)); // Get last 5 orders
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Update profile in context and localStorage
      await updateProfile(profile);
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update profile. Please try again." });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match!" });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters!" });
      return;
    }

    // In a real app, you'd verify current password with backend
    setMessage({ type: "success", text: "Password changed successfully!" });
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });

    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Pending": return "#fff3cd";
      case "Processing": return "#cce5ff";
      case "Shipped": return "#d4edda";
      case "Delivered": return "#d1ecf1";
      case "Cancelled": return "#f8d7da";
      default: return "#fff";
    }
  };

  const getStatusTextColor = (status) => {
    switch(status) {
      case "Pending": return "#856404";
      case "Processing": return "#004085";
      case "Shipped": return "#155724";
      case "Delivered": return "#0c5460";
      case "Cancelled": return "#721c24";
      default: return "#000";
    }
  };

  const formatNaira = (amount) => {
    return `₦${amount?.toLocaleString() || 0}`;
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Manage your account settings and view your information</p>
      </div>

      {/* Tab Navigation */}
      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          👤 Profile Information
        </button>
        <button 
          className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          📦 Order History
        </button>
        <button 
          className={`tab-btn ${activeTab === "security" ? "active" : ""}`}
          onClick={() => setActiveTab("security")}
        >
          🔒 Security Settings
        </button>
        <button 
          className={`tab-btn ${activeTab === "preferences" ? "active" : ""}`}
          onClick={() => setActiveTab("preferences")}
        >
          ⚙️ Preferences
        </button>
      </div>

      {/* Message Alert */}
      {message.text && (
        <div className={`alert-message ${message.type}`}>
          {message.type === "success" ? "✅" : "❌"} {message.text}
        </div>
      )}

      {/* Tab Content */}
      <div className="tab-content">
        {/* Profile Information Tab */}
        {activeTab === "profile" && (
          <div className="profile-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              {!isEditing && (
                <button 
                  className="edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  ✏️ Edit Profile
                </button>
              )}
            </div>

            <form onSubmit={handleProfileSubmit} className="profile-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    placeholder="Enter your address"
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={profile.city}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    placeholder="City"
                  />
                </div>

                <div className="form-group">
                  <label>State</label>
                  <select
                    name="state"
                    value={profile.state}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                  >
                    <option value="">Select State</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Kano">Kano</option>
                    <option value="Ibadan">Ibadan</option>
                    <option value="Kaduna">Kaduna</option>
                    <option value="Port Harcourt">Port Harcourt</option>
                    <option value="Benin">Benin</option>
                    <option value="Maiduguri">Maiduguri</option>
                    <option value="Zaria">Zaria</option>
                    <option value="Aba">Aba</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={profile.postalCode}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    placeholder="Postal code"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => {
                      setIsEditing(false);
                      // Reset to original values
                      setProfile({
                        name: user.name || "",
                        email: user.email || "",
                        phone: user.phone || "",
                        address: user.address || "",
                        city: user.city || "",
                        state: user.state || "",
                        postalCode: user.postalCode || ""
                      });
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="save-btn"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </form>

            {/* Account Summary */}
            <div className="account-summary">
              <h3>Account Summary</h3>
              <div className="summary-grid">
                <div className="summary-card">
                  <span className="summary-icon">📅</span>
                  <div>
                    <p className="summary-label">Member Since</p>
                    <p className="summary-value">January 2024</p>
                  </div>
                </div>
                <div className="summary-card">
                  <span className="summary-icon">📦</span>
                  <div>
                    <p className="summary-label">Total Orders</p>
                    <p className="summary-value">{recentOrders.length}</p>
                  </div>
                </div>
                <div className="summary-card">
                  <span className="summary-icon">⭐</span>
                  <div>
                    <p className="summary-label">Loyalty Points</p>
                    <p className="summary-value">1,250</p>
                  </div>
                </div>
                <div className="summary-card">
                  <span className="summary-icon">🏷️</span>
                  <div>
                    <p className="summary-label">Member Tier</p>
                    <p className="summary-value">Gold</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order History Tab */}
        {activeTab === "orders" && (
          <div className="orders-section">
            <h2>Recent Orders</h2>
            {recentOrders.length === 0 ? (
              <div className="no-orders">
                <p>You haven't placed any orders yet.</p>
                <button 
                  className="shop-now-btn"
                  onClick={() => window.location.href = "/products"}
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="orders-list">
                {recentOrders.map((order, index) => (
                  <div key={index} className="order-item">
                    <div className="order-header">
                      <span className="order-id">Order #{order.id}</span>
                      <span className="order-date">{order.date}</span>
                    </div>
                    <div className="order-details">
                      <span className="order-total">Total: {formatNaira(order.total)}</span>
                      <span 
                        className="order-status"
                        style={{
                          backgroundColor: getStatusColor(order.status),
                          color: getStatusTextColor(order.status)
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                    <button className="view-order-btn">View Details</button>
                  </div>
                ))}
                <button className="view-all-btn">View All Orders</button>
              </div>
            )}
          </div>
        )}

        {/* Security Settings Tab */}
        {activeTab === "security" && (
          <div className="security-section">
            <h2>Security Settings</h2>
            
            <div className="security-card">
              <h3>Change Password</h3>
              <form onSubmit={handlePasswordSubmit} className="password-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <button type="submit" className="change-password-btn">
                  Update Password
                </button>
              </form>
            </div>

            <div className="security-card">
              <h3>Two-Factor Authentication</h3>
              <p>Add an extra layer of security to your account</p>
              <button className="enable-2fa-btn">Enable 2FA</button>
            </div>

            <div className="security-card">
              <h3>Active Sessions</h3>
              <p>You are currently logged in on this device</p>
              <button className="logout-all-btn">Logout from all devices</button>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === "preferences" && (
          <div className="preferences-section">
            <h2>Preferences</h2>
            
            <div className="preferences-card">
              <h3>Notification Settings</h3>
              <div className="preference-item">
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
                <div>
                  <p className="pref-title">Email Notifications</p>
                  <p className="pref-desc">Receive order updates via email</p>
                </div>
              </div>

              <div className="preference-item">
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
                <div>
                  <p className="pref-title">SMS Notifications</p>
                  <p className="pref-desc">Get delivery updates via SMS</p>
                </div>
              </div>

              <div className="preference-item">
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
                <div>
                  <p className="pref-title">Promotional Emails</p>
                  <p className="pref-desc">Receive offers and discounts</p>
                </div>
              </div>
            </div>

            <div className="preferences-card">
              <h3>Language & Region</h3>
              <div className="form-group">
                <label>Language</label>
                <select defaultValue="en">
                  <option value="en">English</option>
                  <option value="ha">Hausa</option>
                  <option value="yo">Yoruba</option>
                  <option value="ig">Igbo</option>
                </select>
              </div>

              <div className="form-group">
                <label>Currency</label>
                <select defaultValue="NGN">
                  <option value="NGN">₦ Naira (NGN)</option>
                  <option value="USD">$ Dollar (USD)</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;