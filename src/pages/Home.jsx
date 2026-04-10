// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

// Images
import images1 from "../assets/images-1.jpg"; 
import images2 from "../assets/images-2.jpg";
import images3 from "../assets/images-3.jpg";
import images4 from "../assets/images-4.png";
import images5 from "../assets/images-5.jpg";
import images6 from "../assets/images-6.jpg";
import images7 from "../assets/images-7.jpg";
import images8 from "../assets/images-8.jpg";
import images9 from "../assets/images-9.png";
import images10 from "../assets/images-10.jpg";
import images11 from "../assets/images-11.jpg";
import images12 from "../assets/images-12.jpg";
import images13 from "../assets/images-13.jpg";
import images14 from "../assets/images-14.jpg";
import images15 from "../assets/images-15.jpg";
import images16 from "../assets/images-16.jpg";
import images17 from "../assets/images-17.jpg";
import images18 from "../assets/images-18.jpg";
import images19 from "../assets/images-19.jpg";
import images20 from "../assets/images-20.jpg";

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
  { name: "Lipton Ice Tea", brand: "Lipton", category: "Soft Drink", price: 350, img: images10 },
  { name: "Pepsi Max", brand: "Pepsi", category: "Soft Drink", price: 470, img: images11 },
  { name: "Monster Energy", brand: "Monster", category: "Energy", price: 900, img: images12 },
  { name: "Tango Orange", brand: "Tango", category: "Soft Drink", price: 400, img: images13 },
  { name: "Nestle Pure Life", brand: "Nestle", category: "Water", price: 320, img: images14 },
  { name: "Schweppes", brand: "Schweppes", category: "Soft Drink", price: 450, img: images15 },
  { name: "Mountain Dew", brand: "Pepsi", category: "Soft Drink", price: 480, img: images16 },
  { name: "Hollandia", brand: "Hollandia", category: "Dairy", price: 600, img: images17 },
  { name: "Cappy Juice", brand: "Cappy", category: "Juice", price: 550, img: images18 },
  { name: "Fayrouz", brand: "Fayrouz", category: "Soft Drink", price: 500, img: images19 },
  { name: "Amstel Malta", brand: "Amstel", category: "Energy/Non-alcoholic", price: 480, img: images20 },
];

function Home() {
  const navigate = useNavigate();
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
          {products.map((p, i) => (
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