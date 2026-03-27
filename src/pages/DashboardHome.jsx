// src/pages/DashboardHome.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function DashboardHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clickedSections, setClickedSections] = useState({});

  const quickActions = [
    { icon: "🛒", label: "Place Order", path: "/place-order", color: "#fbbf24" },
    { icon: "❤️", label: "My Wishlist", path: "/dashboard/wishlist", color: "#ef4444" },
    { icon: "💰", label: "Payment Center", path: "/dashboard/payment", color: "#10b981" },
    { icon: "💬", label: "Chat with Us", path: "/dashboard/chat", color: "#3b82f6" },
  ];

  const sections = [
    {
      id: 1,
      icon: "🎯",
      title: "Your Mission Today",
      content: "Ready to stock up? Your next favorite drink is just a click away.",
      message: "🎯 Mission accepted! Start exploring our beverages!"
    },
    {
      id: 2,
      icon: "📊",
      title: "Order Insights",
      content: "See your buying patterns and get personalized recommendations.",
      message: "📊 Coming soon! We're analyzing your preferences."
    },
    {
      id: 3,
      icon: "🎁",
      title: "Birthday Treat",
      content: "Don't miss your special birthday discount coming next month!",
      message: "🎁 We'll remind you when your birthday is near!"
    },
    {
      id: 4,
      icon: "🏆",
      title: "Top Buyer Status",
      content: "You're on your way to becoming a VIP member. Just 3 more orders!",
      message: "🏆 Keep shopping! VIP status is within reach!"
    },
    {
      id: 5,
      icon: "📱",
      title: "Mobile App",
      content: "Get our app for faster ordering and exclusive deals.",
      message: "📱 App link will be sent to your email soon!"
    },
    {
      id: 6,
      icon: "🤝",
      title: "Refer a Friend",
      content: "Invite friends and get ₦500 off your next order!",
      message: "🤝 Great! Share your referral link with friends!"
    },
    {
      id: 7,
      icon: "📝",
      title: "Feedback Welcome",
      content: "Help us serve you better. Share your thoughts!",
      message: "📝 Thank you! Your feedback matters to us."
    },
    {
      id: 8,
      icon: "🔔",
      title: "Notifications",
      content: "Get alerts when your favorite drinks are back in stock.",
      message: "🔔 You'll now receive stock alerts!"
    },
    {
      id: 9,
      icon: "🎉",
      title: "Festive Specials",
      content: "Holiday discounts coming soon. Stay tuned!",
      message: "🎉 We'll notify you when discounts go live!"
    },
    {
      id: 10,
      icon: "💡",
      title: "Pro Tip",
      content: "Buy in bulk and save up to 20% on your favorite brands.",
      message: "💡 Smart choice! Bulk buying saves you more!"
    }
  ];

  const handleSectionClick = (id, message) => {
    setClickedSections({ ...clickedSections, [id]: message });
    setTimeout(() => {
      setClickedSections(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }, 3000);
  };

  return (
    <div className="dashboard-home">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-content">
          <h1>Welcome back, {user?.name || "Customer"}! 👋</h1>
          <p>Manage your orders, payments, and connect with support.</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="quick-action-card"
              onClick={() => navigate(action.path)}
              style={{ '--action-color': action.color }}
            >
              <span className="action-icon">{action.icon}</span>
              <span className="action-label">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 10 Interactive Sections */}
      <div className="sections-grid">
        {sections.map((section) => (
          <div 
            key={section.id} 
            className="dashboard-card"
            onClick={() => handleSectionClick(section.id, section.message)}
          >
            <div className="card-icon">{section.icon}</div>
            <h3>{section.title}</h3>
            <p>{section.content}</p>
            <button className="card-btn">
              {section.action || "Explore"} →
            </button>
            {clickedSections[section.id] && (
              <div className="toast-message">
                {clickedSections[section.id]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardHome;