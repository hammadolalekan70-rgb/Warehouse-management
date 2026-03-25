// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import images1 from "../assets/images-1.jpg"; 
import images2 from "../assets/images-2.jpg";
import images3 from "../assets/images-3.jpg";
import images4 from "../assets/images-4.png";
import images5 from "../assets/images-5.jpg";
import images6 from "../assets/images-6.jpg";
import images7 from "../assets/images-7.jpg";
import images8 from "../assets/images-8.jpg";
import images9 from "../assets/images-9.png";

const products = [
  { name: "Coca-Cola", brand: "Coca-Cola", category: "Soft Drink", price: 500, img: images1 },
  { name: "Fanta", brand: "Fanta", category: "Soft Drink", price: 450, img: images2 },
  { name: "Sprite", brand: "Sprite", category: "Soft Drink", price: 450, img: images3 },
  { name: "Pepsi", brand: "Pepsi", category: "Soft Drink", price: 480, img: images4 },
  { name: "7Up", brand: "7Up", category: "Soft Drink", price: 450, img: images5 },
  { name: "Malta Guinness", brand: "Malta", category: "Energy/Non-alcoholic", price: 500, img: images6 },
  { name: "Red Bull", brand: "Red Bull", category: "Energy", price: 800, img: images7 },
  { name: "Eva Water", brand: "Eva", category: "Water", price: 300, img: images8 },
  { name: "Aquafina", brand: "Aquafina", category: "Water", price: 300, img: images9 },
];

function Home() {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const brands = [...new Set(products.map((p) => p.brand))];
  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    let brandMatch = selectedBrand ? p.brand === selectedBrand : true;
    let categoryMatch = selectedCategory ? p.category === selectedCategory : true;

    let priceMatch = true;
    if (selectedPrice === "low") priceMatch = p.price <= 500;
    else if (selectedPrice === "medium") priceMatch = p.price > 500 && p.price <= 700;
    else if (selectedPrice === "high") priceMatch = p.price > 700;

    return brandMatch && categoryMatch && priceMatch;
  });

  const featured = products.slice(0, 4);

  const handleBuyNow = () => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!isLoggedIn || !user) {
      navigate("/login?redirect=dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to Hazan Warehouse</h1>
        <p>Bulk beverages, fresh stock, fast delivery</p>
        <button className="cta-btn" onClick={() => navigate("/products")}>Browse Products</button>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <h2>Filter Products</h2>

        <div className="filters">

          <div>
            <label>Brand: </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">All</option>
              {brands.map((b, i) => (
                <option key={i} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Category: </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All</option>
              {categories.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Price: </label>
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
            >
              <option value="">All</option>
              <option value="low">₦0 - ₦500</option>
              <option value="medium">₦501 - ₦700</option>
              <option value="high">₦701+</option>
            </select>
          </div>

        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <h2>Featured Products</h2>

        <div className="product-grid">
          {featured.map((p, i) => (
            <div className="product-card" key={i}>
              <img src={p.img} alt={p.name} />
              <h3>{p.name}</h3>
              <p className="price">₦{p.price}</p>
              <button onClick={handleBuyNow} className="buy-btn">Buy Now</button>
            </div>
          ))}
        </div>

      </section>

      {/* All Products */}
      <section className="all-products">
        <h2>All Products</h2>

        <div className="product-grid">
          {filteredProducts.map((p, i) => (
            <div className="product-card" key={i}>
              <img src={p.img} alt={p.name} />
              <h3>{p.name}</h3>
              <p className="price">₦{p.price}</p>
              <button onClick={handleBuyNow} className="buy-btn">Buy Now</button>
            </div>
          ))}
        </div>

      </section>

      {/* Why Section */}
      <section className="why-section">
        <h2>Why Buy From Us?</h2>

        <div className="why-grid">

          <div className="why-card">
            <h3>Fast Delivery</h3>
            <p>Get your products delivered on time, every time.</p>
          </div>

          <div className="why-card">
            <h3>Fresh Stock</h3>
            <p>All beverages are stored properly to guarantee freshness.</p>
          </div>

          <div className="why-card">
            <h3>Bulk Discounts</h3>
            <p>Special pricing for wholesalers and large orders.</p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;