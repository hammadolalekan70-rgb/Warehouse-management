import React from "react";

// About Section Component with Icon Badge
const AboutItem = ({ title, text, img, icon, reverse }) => (
  <div className={`about-item ${reverse ? "reverse" : ""}`}>
    {/* Decorative Icon Badge */}
    {icon && <img src={icon} alt="" className="about-icon-badge" />}
    {img && <img src={img} alt={title} className="about-img" />}
    <div className="about-text">
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
      img: "https://cdn-icons-png.flaticon.com/512/2910/2910763.png",
      icon: "https://cdn-icons-png.flaticon.com/512/2985/2985150.png"
    },
    {
      title: "Our Mission",
      text: "To deliver affordable, fresh and reliable drink supplies to businesses across Nigeria.",
      img: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
      icon: "https://cdn-icons-png.flaticon.com/512/2462/2462719.png"
    },
    {
      title: "Our Vision",
      text: "To become West Africa’s leading beverage warehouse network.",
      img: "https://cdn-icons-png.flaticon.com/512/2910/2910763.png",
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
    },
    {
      title: "Quality Assurance",
      text: "Every product is carefully stored under optimal conditions to maintain freshness and safety.",
      img: "https://cdn-icons-png.flaticon.com/512/2910/2910788.png",
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
    },
    {
      title: "Customer Commitment",
      text: "We prioritize long-term partnerships built on trust, transparency and timely delivery.",
      img: "https://cdn-icons-png.flaticon.com/512/2910/2910791.png",
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828899.png"
    },
    {
      title: "Logistics & Distribution Network",
      text: "Our delivery system covers major cities with structured transport scheduling to guarantee on-time dispatch.",
      img: "https://cdn-icons-png.flaticon.com/512/2910/2910812.png",
      icon: "https://cdn-icons-png.flaticon.com/512/2910/2910771.png"
    },
    {
      title: "Operational Excellence",
      text: "We implement organized stock rotation, damage prevention and performance tracking to ensure operational efficiency.",
      img: "https://cdn-icons-png.flaticon.com/512/2910/2910815.png",
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828805.png"
    },
  ];

  return (
    <section className="about-page">
      <div className="about-hero">
        <h1>About HayCash Warehouse</h1>
        <p>Your trusted partner for beverages and soft drinks.</p>
      </div>

      <div className="about-grid">
        {sections.map((s, index) => (
          <AboutItem
            key={index}
            title={s.title}
            text={s.text}
            img={s.img}
            icon={s.icon}
            reverse={index % 2 !== 0} // alternate layout
          />
        ))}
      </div>
    </section>
  );
}

export default About;