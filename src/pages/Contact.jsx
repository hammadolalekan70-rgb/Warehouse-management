
function Contact() {
  return (
    <section className="contact-section">
      <div className="contact-header">
        <h2>Contact Our Team</h2>
        <p>
          We maintain open communication with customers to ensure
          efficient order processing and support. Reach out to us anytime!
        </p>
      </div>

      <div className="contact-body">
        {/* Contact Form */}
        <form className="contact-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <textarea placeholder="How can we assist you?" required></textarea>
          <button type="submit">Send Message</button>
        </form>

        {/* Contact Info + Social + Map */}
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p><strong>Phone:</strong> +234 812 345 6789</p>
          <p><strong>Email:</strong> support@haycashwarehouse.com</p>
          <p><strong>Location:</strong> Ibadan, Nigeria</p>

          <h3>Working Hours</h3>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>

          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">📘</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📸</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">🔗</a>
          </div>

          <h3>Find Us Here</h3>
          <div className="map-container">
            <iframe
              title="HayCash Warehouse Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.567123456!2d3.900123!3d7.377123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8f1e7d0b123%3A0xabcdef1234567890!2sIbadan%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1671234567890!5m2!1sen!2sng"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;