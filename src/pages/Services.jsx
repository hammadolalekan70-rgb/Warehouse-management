
function Services() {
  const servicesList = [
    { icon: "🛒", title: "Bulk Beverage Supply", description: "We supply a wide range of beverages in bulk for businesses, events, and retailers." },
    { icon: "⚡", title: "Fast Delivery", description: "Quick and reliable delivery service to ensure your stock arrives on time." },
    { icon: "📦", title: "Inventory Management", description: "Track and manage your beverage stock efficiently to avoid shortages." },
    { icon: "🤝", title: "Wholesale Distribution", description: "Providing wholesale distribution solutions for businesses of any size." },
    { icon: "📝", title: "Custom Orders", description: "We accommodate special orders and tailor delivery schedules to your needs." },
    { icon: "💡", title: "Product Consultation", description: "Expert advice on beverage selection, storage, and pricing strategies." },
    { icon: "🎉", title: "Event Supply Services", description: "Complete beverage solutions for parties, corporate events, and gatherings." },
    { icon: "🌱", title: "Sustainable Packaging", description: "Eco-friendly packaging options for environmentally-conscious clients." },
    { icon: "🏷️", title: "Brand Partnerships", description: "Collaborate with us to promote your beverage brands in bulk markets." },
    { icon: "📞", title: "24/7 Customer Support", description: "Our team is always ready to answer your questions and resolve issues." },
  ];

  return (
    <div className="services-container">
      <h1>Our Services</h1>
      <p className="intro">
        We provide bulk beverage supply, fast delivery, inventory management, and wholesale distribution services.
      </p>

      <div className="services-list">
        {servicesList.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;