// src/pages/PlaceOrderPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { addOrder } from "../services/orderService";
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

function PlaceOrderPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      alert("Please login to place an order");
      navigate("/login");
    }
  }, [navigate, user]);

  const products = [
    { id: 1, name: "Coca-Cola", price: 500, img: images1, category: "Soft Drink" },
    { id: 2, name: "Fanta", price: 450, img: images2, category: "Soft Drink" },
    { id: 3, name: "Sprite", price: 450, img: images3, category: "Soft Drink" },
    { id: 4, name: "Pepsi", price: 480, img: images4, category: "Soft Drink" },
    { id: 5, name: "7Up", price: 450, img: images5, category: "Soft Drink" },
    { id: 6, name: "Coca-Cola Can", price: 300, img: images10, category: "Soft Drink" },
    { id: 7, name: "Fanta Exotic", price: 500, img: images11, category: "Soft Drink" },
    { id: 8, name: "Pepsi Can", price: 300, img: images12, category: "Soft Drink" },
    { id: 9, name: "Eva Water", price: 300, img: images8, category: "Water" },
    { id: 10, name: "Aquafina", price: 300, img: images9, category: "Water" },
    { id: 11, name: "Mirinda", price: 450, img: images13, category: "Soft Drink" },
    { id: 12, name: "Mountain Dew", price: 480, img: images14, category: "Soft Drink" },
    { id: 13, name: "Schweppes", price: 500, img: images15, category: "Soft Drink" },
    { id: 14, name: "Predator Energy", price: 600, img: images18, category: "Energy" },
    { id: 15, name: "Red Bull", price: 800, img: images7, category: "Energy" },
    { id: 16, name: "Hollandia Yoghurt", price: 700, img: images16, category: "Dairy" },
    { id: 17, name: "5Alive Juice", price: 500, img: images17, category: "Juice" },
    { id: 18, name: "Chivita Juice", price: 600, img: images19, category: "Juice" },
    { id: 19, name: "Malta Guinness", price: 500, img: images6, category: "Energy" },
    { id: 20, name: "Fearless Energy", price: 650, img: images20, category: "Energy" },
  ];

  const [orderItems, setOrderItems] = useState(
    products.map((p) => ({ ...p, quantity: 0 }))
  );

  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    deliveryMethod: "standard",
    notes: ""
  });

  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState(null);

  const handleQuantityChange = (id, qty) => {
    setOrderItems(
      orderItems.map((item) =>
        item.id === id ? { ...item, quantity: Number(qty) } : item
      )
    );
  };

  const incrementQuantity = (id) => {
    setOrderItems(
      orderItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setOrderItems(
      orderItems.map((item) =>
        item.id === id && item.quantity > 0 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };

  const getSelectedItems = () => {
    return orderItems.filter((item) => item.quantity > 0);
  };

  const selectedItems = getSelectedItems();
  
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const shipping = subtotal > 50000 ? 0 : 2500;
  const tax = 50; // Flat ₦50 tax (changed from percentage)
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSendOrder = () => {
    const itemsOrdered = selectedItems;
    
    if (itemsOrdered.length === 0) {
      alert("Please select at least one item.");
      return;
    }

    if (!customerInfo.phone || !customerInfo.address) {
      alert("Please fill in your phone number and delivery address.");
      return;
    }

    // Create order object
    const newOrder = {
      customerName: customerInfo.name || user?.name || "Customer",
      customerEmail: customerInfo.email || user?.email || "customer@example.com",
      customerPhone: customerInfo.phone,
      customerAddress: customerInfo.address,
      items: itemsOrdered.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        category: item.category
      })),
      subtotal: subtotal,
      shipping: shipping,
      tax: tax,
      total: total,
      status: "Pending",
      paymentStatus: "Pending",
      deliveryMethod: customerInfo.deliveryMethod,
      notes: customerInfo.notes
    };

    console.log("🚀 Placing order:", newOrder);

    // Save using the service
    const savedOrder = addOrder(newOrder);
    console.log("✅ Order saved:", savedOrder);

    setPlacedOrderId(savedOrder.id);
    setOrderPlaced(true);
    
    // Reset form
    setOrderItems(products.map((p) => ({ ...p, quantity: 0 })));
    setCustomerInfo({
      ...customerInfo,
      phone: "",
      address: "",
      notes: ""
    });
  };

  const handleContinueShopping = () => {
    setOrderPlaced(false);
    navigate("/products");
  };

  const handleViewOrders = () => {
    navigate("/dashboard/orders");
  };

  if (orderPlaced) {
    return (
      <div className="order-confirmation">
        <div className="confirmation-card">
          <div className="success-icon">✅</div>
          <h1>Order Placed Successfully!</h1>
          <p>Your order #<strong>{placedOrderId}</strong> has been received.</p>
          <p>We'll process it shortly and send you a confirmation email.</p>
          
          <div className="order-summary">
            <h3>Order Summary</h3>
            <p>Items: {selectedItems.length}</p>
            <p>Subtotal: ₦{subtotal.toLocaleString()}</p>
            <p>Shipping: {shipping === 0 ? "Free" : `₦${shipping.toLocaleString()}`}</p>
            <p>Tax: ₦50</p>
            <p className="total">Total: ₦{total.toLocaleString()}</p>
          </div>

          <div className="confirmation-actions">
            <button onClick={handleContinueShopping} className="continue-btn">
              Continue Shopping
            </button>
            <button onClick={handleViewOrders} className="view-orders-btn">
              View My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="place-order-page"> {/* Changed from orders-container to place-order-page */}
      <h1>Place Your Order</h1>

      {!showCheckout ? (
        /* Product Selection View */
        <>
          <div className="products-grid"> {/* Changed from order-grid to products-grid */}
            {orderItems.map((item) => (
              <div key={item.id} className="product-card"> {/* Changed from order-card to product-card */}
                <img src={item.img} alt={item.name} />
                <h3>{item.name}</h3>
                <p className="category">{item.category}</p>
                <p className="price">₦{item.price}</p>
                
                <div className="quantity-controls">
                  <button 
                    onClick={() => decrementQuantity(item.id)}
                    className="qty-btn minus"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    className="qty-input"
                  />
                  <button 
                    onClick={() => incrementQuantity(item.id)}
                    className="qty-btn plus"
                  >
                    +
                  </button>
                </div>
                
                <p className="item-total">
                  Amount: <span>₦{(item.quantity * item.price).toLocaleString()}</span>
                </p>
              </div>
            ))}
          </div>

          {selectedItems.length > 0 && (
            <div className="order-summary-bar">
              <div className="summary-info">
                <span>Selected Items: <strong>{selectedItems.length}</strong></span>
                <span>Subtotal: <strong>₦{subtotal.toLocaleString()}</strong></span>
              </div>
              <button 
                className="proceed-checkout-btn"
                onClick={() => setShowCheckout(true)}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </>
      ) : (
        /* Checkout View */
        <div className="checkout-container">
          <button 
            className="back-btn"
            onClick={() => setShowCheckout(false)}
          >
            ← Back to Products
          </button>

          <div className="checkout-grid">
            {/* Customer Information Form */}
            <div className="checkout-form">
              <h2>Delivery Information</h2>
              
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  readOnly={!!user}
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label>Delivery Address *</label>
                <textarea
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  placeholder="Enter your full delivery address"
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label>Delivery Method</label>
                <select
                  name="deliveryMethod"
                  value={customerInfo.deliveryMethod}
                  onChange={handleInputChange}
                >
                  <option value="standard">Standard Delivery (3-5 days)</option>
                  <option value="express">Express Delivery (1-2 days) - +₦2000</option>
                  <option value="sameday">Same Day Delivery - +₦5000</option>
                </select>
              </div>

              <div className="form-group">
                <label>Order Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={customerInfo.notes}
                  onChange={handleInputChange}
                  placeholder="Any special instructions?"
                  rows="2"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="checkout-summary">
              <h2>Order Summary</h2>
              
              <div className="summary-items">
                {selectedItems.map(item => (
                  <div key={item.id} className="summary-item">
                    <span className="item-name">{item.name} x{item.quantity}</span>
                    <span className="item-price">₦{(item.quantity * item.price).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="total-row">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? "Free" : `₦${shipping.toLocaleString()}`}</span>
                </div>
                <div className="total-row">
                  <span>Tax (Flat Rate):</span>
                  <span>₦50</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total:</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              <button 
                className="place-order-btn"
                onClick={handleSendOrder}
              >
                Place Order
              </button>

              <p className="secure-checkout">
                🔒 Secure Checkout - Your information is safe
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaceOrderPage;