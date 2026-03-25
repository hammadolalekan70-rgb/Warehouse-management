// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

// Admin user
const ADMIN_USER = {
  id: "admin1",
  name: "Admin User",
  email: "admin@hazan.com",
  password: "Admin@123",
  role: "admin"
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("🔐 AuthContext - Login attempt for:", email);
        
        // Check admin first
        if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
          const { password, ...adminWithoutPassword } = ADMIN_USER;
          console.log("🔐 AuthContext - Admin login successful");
          setUser(adminWithoutPassword);
          localStorage.setItem("user", JSON.stringify(adminWithoutPassword));
          resolve({ success: true, user: adminWithoutPassword });
        } 
        // Check regular users
        else {
          const users = JSON.parse(localStorage.getItem("users")) || [];
          const foundUser = users.find(u => u.email === email && u.password === password);
          
          if (foundUser) {
            const userWithRole = { ...foundUser, role: "customer" };
            console.log("🔐 AuthContext - Customer login successful");
            setUser(userWithRole);
            localStorage.setItem("user", JSON.stringify(userWithRole));
            resolve({ success: true, user: userWithRole });
          } else {
            console.log("🔐 AuthContext - Login failed");
            reject({ success: false, message: "Invalid email or password" });
          }
        }
      }, 500);
    });
  };

  const logout = () => {
    console.log("🔐 AuthContext - Logging out");
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin"
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};