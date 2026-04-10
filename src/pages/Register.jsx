// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid phone number (10-11 digits)";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required";
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Get users array from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      
      // Check if email already exists
      const userExists = users.some((user) => user.email === formData.email);
      
      if (userExists) {
        setErrors({ email: "This email is already registered! Please login." });
        setLoading(false);
        return;
      }
      
      // Create new user object
      const newUser = {
        id: Date.now(),
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        address: formData.address,
        role: "customer",
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      
      // Also store user info for auto-login
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("user", JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }));
      
      setLoading(false);
      alert("Account created successfully! Welcome aboard!");
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Create Account</h2>
          <p>Join Hazan Warehouse today</p>
        </div>

        <form onSubmit={handleRegister} className="register-form">
          {/* Full Name */}
          <div className="form-group">
            <label>Full Name *</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={errors.fullName ? "error" : ""}
              />
            </div>
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email Address *</label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? "error" : ""}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label>Phone Number *</label>
            <div className="input-wrapper">
              <span className="input-icon">📱</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="08012345678"
                className={errors.phone ? "error" : ""}
              />
            </div>
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password *</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className={errors.password ? "error" : ""}
              />
              <button 
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
            {!errors.password && formData.password && (
              <div className="password-strength">
                <span className={`strength ${formData.password.length >= 6 ? 'weak' : ''}`}>
                  {formData.password.length < 6 ? "Too short" : 
                   formData.password.length < 8 ? "Weak" :
                   formData.password.length < 10 ? "Medium" : "Strong"}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password *</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={errors.confirmPassword ? "error" : ""}
              />
              <button 
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          {/* Address */}
          <div className="form-group">
            <label>Delivery Address *</label>
            <div className="input-wrapper">
              <span className="input-icon">🏠</span>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your full delivery address"
                rows="3"
                className={errors.address ? "error" : ""}
              />
            </div>
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>

          {/* Terms and Conditions */}
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <span>I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link></span>
            </label>
            {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="register-footer">
          <p>Already have an account? <Link to="/login">Sign in here</Link></p>
        </div>

        <div className="register-benefits">
          <h4>Why join us?</h4>
          <div className="benefits-list">
            <div className="benefit-item">
              <span>🚚</span>
              <span>Fast Delivery</span>
            </div>
            <div className="benefit-item">
              <span>💰</span>
              <span>Best Prices</span>
            </div>
            <div className="benefit-item">
              <span>⭐</span>
              <span>Quality Products</span>
            </div>
            <div className="benefit-item">
              <span>🎁</span>
              <span>Exclusive Offers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;