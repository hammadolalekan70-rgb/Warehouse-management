// src/pages/products.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useProducts } from "../contexts/ProductContext";

// Import all images
import images1 from "../assets/images-1.jpg"; 
import images2 from "../assets/images-2.jpg";
import images3 from "../assets/images-3.jpg";
import images4 from "../assets/images-4.png";
import images5 from "../assets/images-5.jpg";
import images8 from "../assets/images-8.jpg";
import images9 from "../assets/images-9.png";
import images10 from "../assets/images-10.jpg";
import images11 from "../assets/images-11.jpg";
import images12 from "../assets/images-12.jpg";
import images13 from "../assets/images-13.jpg";
import images14 from "../assets/images-14.jpg";
import images15 from "../assets/images-15.jpg";
import images7 from "../assets/images-7.jpg";
import images6 from "../assets/images-6.jpg";
import images16 from "../assets/images-16.jpg";
import images17 from "../assets/images-17.jpg";
import images18 from "../assets/images-18.jpg";
import images19 from "../assets/images-19.jpg";
import images20 from "../assets/images-20.jpg";

// Map image filenames to actual imports
const imageMap = {
  "images-1.jpg": images1,
  "images-2.jpg": images2,
  "images-3.jpg": images3,
  "images-4.png": images4,
  "images-5.jpg": images5,
  "images-6.jpg": images6,
  "images-7.jpg": images7,
  "images-8.jpg": images8,
  "images-9.png": images9,
  "images-10.jpg": images10,
  "images-11.jpg": images11,
  "images-12.jpg": images12,
  "images-13.jpg": images13,
  "images-14.jpg": images14,
  "images-15.jpg": images15,
  "images-16.jpg": images16,
  "images-17.jpg": images17,
  "images-18.jpg": images18,
  "images-19.jpg": images19,
  "images-20.jpg": images20
};

// Product Card Component
function ProductCard({ product }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBuyNow = () => {
    if (!user) {
      // Not logged in - redirect to login with return URL to dashboard
      navigate("/login?redirect=dashboard");
    } else {
      // Logged in - go to dashboard
      navigate("/dashboard");
    }
  };

  return (
    <div className="product-card">
      <img src={imageMap[product.image] || images1} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="brand">{product.brand}</p>
      <p className="price">₦{product.price}</p>
      <p className="stock">In Stock: {product.stock}</p>
      <button onClick={handleBuyNow} className="buy-btn">Buy Now</button>
    </div>
  );
}

function Products() {
  const { products } = useProducts(); // Get products from context

  return (
    <section className="products-page">
      <h1>Our Products</h1>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
    
  );
}

export default Products;