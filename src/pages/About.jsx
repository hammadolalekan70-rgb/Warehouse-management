import React from "react";

// About Item Component: Jumia-style card with icon (no images)
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
      text: "Our delivery system covers major cities with structured transport scheduling to guarantee on-time dispatch.",
      icon: "https://cdn-icons-png.flaticon.com/512/2910/2910812.png"
    },
    {
      title: "Operational Excellence",
      text: "We implement organized stock rotation, damage prevention and performance tracking to ensure operational efficiency.",
      icon: "https://cdn-icons-png.flaticon.com/512/2910/2910815.png"
    },
  ];

  return (
    <section className="jumia-about">
      {/* Hero / Banner in Jumia style */}
      <div className="jumia-hero">
        <div className="hero-content">
          <h1>About HayCash Warehouse</h1>
          <p>Your trusted partner for beverages and soft drinks.</p>
        </div>
      </div>

      {/* Cards Grid - Jumia product-grid style */}
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

      {/* Inline styles - fully responsive, Jumia colors & effects */}
      <style jsx>{`
        /* Jumia style reset & base */
        .jumia-about {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background: #f5f5f5;  /* Jumia light grey background */
          color: #1a1a1a;
        }

        /* Jumia Orange Hero Banner */
        .jumia-hero {
          background: linear-gradient(95deg, #f68b1e 0%, #f9a43e 100%);
          padding: 2.5rem 1.5rem;
          text-align: center;
          color: white;
          margin-bottom: 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .hero-content h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
          letter-spacing: -0.3px;
        }
        .hero-content p {
          font-size: 1.1rem;
          opacity: 0.95;
          max-width: 600px;
          margin: 0 auto;
          font-weight: 500;
        }

        /* Container like Jumia product listing */
        .jumia-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem 3rem;
        }

        /* Grid layout: Jumia uses 2-4 columns, here responsive grid */
        .jumia-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.8rem;
        }

        /* Jumia-style card (white, rounded corners, subtle border, hover lift) */
        .jumia-about-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.2rem;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          border: 1px solid #eaeaea;
          cursor: pointer;
        }
        .jumia-about-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 20px rgba(0,0,0,0.08);
          border-color: #f68b1e;
        }

        /* Icon container - Jumia often uses orange circle or square behind icons */
        .card-icon {
          flex-shrink: 0;
          width: 70px;
          height: 70px;
          background: #fff2e5;   /* soft orange background */
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .jumia-about-card:hover .card-icon {
          background: #f68b1e;
        }
        .card-icon img {
          width: 42px;
          height: 42px;
          object-fit: contain;
          filter: brightness(0) saturate(100%) invert(35%) sepia(96%) saturate(1236%) hue-rotate(1deg) brightness(98%) contrast(96%);
          transition: filter 0.2s;
        }
        .jumia-about-card:hover .card-icon img {
          filter: brightness(0) invert(1); /* becomes white on hover */
        }

        /* Text side */
        .card-text {
          flex: 1;
        }
        .card-text h3 {
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0 0 0.4rem;
          color: #1a1a1a;
        }
        .card-text p {
          font-size: 0.9rem;
          line-height: 1.45;
          color: #555;
          margin: 0;
        }

        /* Reverse layout: only for desktop (icon right, text left) */
        @media (min-width: 768px) {
          .jumia-about-card.reverse {
            flex-direction: row-reverse;
          }
        }

        /* 📱 Mobile fully responsive (Jumia mobile-first) */
        @media (max-width: 767px) {
          .jumia-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .jumia-about-card {
            flex-direction: row;
            padding: 1.2rem;
            gap: 1rem;
          }
          .jumia-about-card.reverse {
            flex-direction: row;
          }
          .card-icon {
            width: 60px;
            height: 60px;
          }
          .card-icon img {
            width: 34px;
            height: 34px;
          }
          .card-text h3 {
            font-size: 1.1rem;
          }
          .card-text p {
            font-size: 0.85rem;
          }
          .jumia-hero {
            padding: 1.8rem 1rem;
          }
          .hero-content h1 {
            font-size: 1.6rem;
          }
        }

        /* small devices <= 480px */
        @media (max-width: 480px) {
          .card-icon {
            width: 53px;
            height: 53px;
          }
          .card-icon img {
            width: 30px;
            height: 30px;
          }
          .card-text h3 {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
}

export default About;