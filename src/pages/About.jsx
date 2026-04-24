import React from "react";

// About Item Component
const AboutItem = ({ title, text, icon, reverse }) => (
  <div className={`jumia-about-card ${reverse ? "reverse" : ""}`}>
    <div className="card-icon">
      <img src={icon} alt={title} />
    </div>
    <div className="card-text">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  </div>
);

function About() {
  const sections = [
    {
      title: "Who We Are",
      text: "We are a structured beverage warehouse specializing in wholesale distribution of soft drinks and mineral products.",
      icon: "https://cdn-icons-png.flaticon.com/512/2910/2910763.png"
    },
    {
      title: "Our Mission",
      text: "To deliver affordable, fresh and reliable drink supplies to businesses across Nigeria.",
      icon: "https://cdn-icons-png.flaticon.com/512/616/616408.png"
    },
    {
      title: "Our Vision",
      text: "To become West Africa’s leading beverage warehouse network.",
      icon: "https://cdn-icons-png.flaticon.com/512/2910/2910763.png"
    },
    {
      title: "Quality Assurance",
      text: "Every product is carefully stored under optimal conditions to maintain freshness and safety.",
      icon: "https://cdn-icons-png.flaticon.com/512/2910/2910788.png"
    },
    {
      title: "Customer Commitment",
      text: "We prioritize long-term partnerships built on trust, transparency and timely delivery.",
      icon: "https://cdn-icons-png.flaticon.com/512/2910/2910791.png"
    },
    {
      title: "Logistics & Distribution",
      text: "Our delivery system covers major cities with structured transport scheduling.",
      icon: "https://cdn-icons-png.flaticon.com/512/2910/2910812.png"
    },
    {
      title: "Operational Excellence",
      text: "We implement organized stock rotation and performance tracking for efficiency.",
      icon: "https://cdn-icons-png.flaticon.com/512/2910/2910815.png"
    }
  ];

  return (
    <section className="jumia-about">
      {/* Hero */}
      <div className="jumia-hero">
        <div className="hero-content">
          <h1>About HayCash Warehouse</h1>
          <p>Your trusted partner for beverages and soft drinks.</p>
        </div>
      </div>

      {/* Grid */}
      <div className="jumia-container">
        <div className="jumia-grid">
          {sections.map((s, index) => (
            <AboutItem
              key={index}
              title={s.title}
              text={s.text}
              icon={s.icon}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;