// src/pages/DashboardHome.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardHome() {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const welcomeMessage = "Welcome back our valued customer! Kindly place your order now and enjoy better prices. Thank you! 🎉✨";

  useEffect(() => {
    if (!isDeleting && currentIndex < welcomeMessage.length) {
      // Typing
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + welcomeMessage[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } 
    else if (!isDeleting && currentIndex === welcomeMessage.length) {
      // Wait 3 seconds before starting to delete
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 3000);
      return () => clearTimeout(timeout);
    }
    else if (isDeleting && currentIndex > 0) {
      // Deleting
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        setCurrentIndex(prev => prev - 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
    else if (isDeleting && currentIndex === 0) {
      // Reset to start typing again
      setIsDeleting(false);
    }
  }, [currentIndex, isDeleting, welcomeMessage]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Navigation cards (matching sidebar items)
  const navCards = [
    { 
      id: "place-order", 
      path: "/place-order", 
      icon: "🛒", 
      title: "Place Order", 
      description: "Browse our wide range of beverages and place new orders",
      stats: "24 products available",
      badge: "New",
      badgeColor: "#e67e22",
      action: () => navigate("/place-order")
    },
    { 
      id: "wishlist", 
      path: "wishlist", 
      icon: "❤️", 
      title: "My Wishlist", 
      description: "View and manage items you've saved for later",
      stats: "3 items saved",
      badge: "Updated",
      badgeColor: "#e74c3c",
      action: () => navigate("wishlist")
    },
    { 
      id: "payment", 
      path: "payment", 
      icon: "💰", 
      title: "Payment Center", 
      description: "Make secure payments and view transaction history",
      stats: "2 pending payments",
      badge: "Action Required",
      badgeColor: "#27ae60",
      action: () => navigate("payment")
    },
    { 
      id: "chat", 
      path: "chat", 
      icon: "💬", 
      title: "Chat Support", 
      description: "Get instant help from our customer support team",
      stats: "Online now",
      badge: "Live",
      badgeColor: "#9b59b6",
      action: () => navigate("chat")
    }
  ];

  return (
    <div className="dashboard-home">
      {/* Animated Welcome Banner - Reduced Height */}
      <div className="welcome-banner">
        <div className="banner-decoration">🎉</div>
        <div className="banner-content">
          <div className="welcome-icon">👋</div>
          <div className="typing-container">
            <h1 className="typing-text">
              {displayText}
              <span className={`cursor ${showCursor ? 'visible' : 'hidden'}`}>|</span>
            </h1>
          </div>
          <div className="banner-offer">
            <span className="offer-badge">✨ Special Offer ✨</span>
            <p>Get 10% off on orders above ₦50,000! Limited time only.</p>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <h2 className="section-title">
        <span className="title-icon">🚀</span>
        Quick Navigation
        <span className="title-sub">Your dashboard shortcuts</span>
      </h2>
      <div className="nav-cards-grid">
        {navCards.map((card) => (
          <div 
            key={card.id}
            className="nav-card"
            onClick={card.action}
            style={{ cursor: "pointer" }}
          >
            <div className="nav-card-header">
              <div className="nav-card-icon" style={{ background: `${card.badgeColor}20`, color: card.badgeColor }}>
                {card.icon}
              </div>
              {card.badge && (
                <span className="nav-card-badge" style={{ background: card.badgeColor }}>
                  {card.badge}
                </span>
              )}
            </div>
            <div className="nav-card-content">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <div className="nav-card-stats">
                <span className="stats-icon">📊</span>
                {card.stats}
              </div>
            </div>
            <div className="nav-card-arrow">→</div>
          </div>
        ))}
      </div>

      {/* Recommended Products */}
      <h2 className="section-title">
        <span className="title-icon">🔥</span>
        Recommended For You
        <span className="title-sub">Based on your preferences</span>
      </h2>
      <div className="recommended-products">
        <div className="product-recommendation">
          <div className="rec-icon">🥤</div>
          <div className="rec-info">
            <h4>Pepsi (24 pack)</h4>
            <p>Popular choice this week</p>
            <div className="rec-price-row">
              <span className="rec-price">₦11,520</span>
              <span className="rec-discount">-15%</span>
            </div>
          </div>
          <button className="add-btn">Add to Cart +</button>
        </div>
        <div className="product-recommendation">
          <div className="rec-icon">⚡</div>
          <div className="rec-info">
            <h4>Red Bull (12 pack)</h4>
            <p>Limited time offer</p>
            <div className="rec-price-row">
              <span className="rec-price">₦9,600</span>
              <span className="rec-discount">-10%</span>
            </div>
          </div>
          <button className="add-btn">Add to Cart +</button>
        </div>
        <div className="product-recommendation">
          <div className="rec-icon">💧</div>
          <div className="rec-info">
            <h4>Eva Water (12 pack)</h4>
            <p>Best seller</p>
            <div className="rec-price-row">
              <span className="rec-price">₦3,600</span>
              <span className="rec-discount">-5%</span>
            </div>
          </div>
          <button className="add-btn">Add to Cart +</button>
        </div>
      </div>

      {/* Special Promo Banner */}
      <div className="promo-banner">
        <div className="promo-icon">🎁</div>
        <div className="promo-content">
          <h3>Free Delivery on Orders Above ₦100,000!</h3>
          <p>Shop now and enjoy free delivery within Lagos and Ibadan</p>
        </div>
        <button className="promo-btn">Shop Now →</button>
      </div>
    </div>
  );
}

export default DashboardHome;