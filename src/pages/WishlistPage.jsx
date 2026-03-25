// src/pages/WishlistPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getWishlist, removeFromWishlist, clearWishlist } from "../services/wishlistService";

function WishlistPage() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    setLoading(true);
    const items = getWishlist();
    setWishlist(items);
    setLoading(false);
  };

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
    loadWishlist(); // Reload wishlist
  };

  const handleClearAll = () => {
    if (window.confirm("Clear all items from wishlist?")) {
      clearWishlist();
      loadWishlist();
    }
  };

  const handleAddToCart = (product) => {
    // You can implement add to cart functionality here
    alert(`Added ${product.name} to cart`);
  };

  const formatNaira = (amount) => {
    return `₦${amount?.toLocaleString() || 0}`;
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="page-header">
        <h1>My Wishlist</h1>
        {wishlist.length > 0 && (
          <button onClick={handleClearAll} className="clear-btn">
            Clear All
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <div className="empty-icon">❤️</div>
          <h2>Your wishlist is empty</h2>
          <p>Save your favorite items to buy later</p>
          <button 
            onClick={() => navigate("/products")}
            className="shop-now-btn"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div key={item.id} className="wishlist-card">
              <div className="wishlist-image">
                <img src={`/src/assets/${item.image}`} alt={item.name} />
              </div>
              
              <div className="wishlist-details">
                <h3>{item.name}</h3>
                <p className="brand">{item.brand}</p>
                <p className="category">{item.category}</p>
                <p className="price">{formatNaira(item.price)}</p>
                <p className="added-date">
                  Added: {new Date(item.addedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="wishlist-actions">
                <button 
                  onClick={() => handleAddToCart(item)}
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => handleRemove(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;