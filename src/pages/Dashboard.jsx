// src/pages/Dashboard.jsx
import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const dashboardCards = [
    {
      id: "dashboard",
      path: "",
      icon: "📊",
      title: "Dashboard Overview",
    },
    {
      id: "place-order",
      path: "place-order", // ✅ Changed from "/place-order" to "place-order"
      icon: "🛒",
      title: "Place Order",
    },
    {
      id: "wishlist",
      path: "wishlist",
      icon: "❤️",
      title: "My Wishlist",
    },
    {
      id: "payment",
      path: "payment",
      icon: "💰",
      title: "Payment Center",
    },
    {
      id: "chat",
      path: "chat",
      icon: "💬",
      title: "Chat with Us",
    },
  ];

  if (!user) return null;

  return (
    <div className="dashboard-container">
      
      {/* ================= STICKY SIDEBAR ================= */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="user-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || "C"}
          </div>
          <h2>My Dashboard</h2>
          <p className="welcome-text">
            Welcome, <strong>{user?.name || "Customer"}</strong>!
          </p>
        </div>

        <nav className="dashboard-nav-menu">
          {dashboardCards.map((card) => (
            <NavLink
              key={card.id}
              to={card.path}
              end={card.path === ""}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <span className="nav-icon">{card.icon}</span>
              <span className="nav-text">{card.title}</span>
            </NavLink>
          ))}

          {/* Logout */}
          <button onClick={handleLogout} className="logout-btn">
            <span className="nav-icon">🚪</span>
            <span className="nav-text">Logout</span>
          </button>
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="dashboard-main-content">
        <Outlet />
      </main>

    </div>
  );
}

export default Dashboard;