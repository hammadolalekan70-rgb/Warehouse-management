// src/services/orderService.js

// ========================================
// ORDER FUNCTIONS
// ========================================

// Get all orders
export const getAllOrders = () => {
  const orders = localStorage.getItem('orders');
  return orders ? JSON.parse(orders) : [];
};

// Save all orders
const saveOrders = (orders) => {
  localStorage.setItem('orders', JSON.stringify(orders));
};

// ========================================
// PRODUCT FUNCTIONS (FOR STOCK MANAGEMENT)
// ========================================

// Get all products from localStorage
const getProducts = () => {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
};

// Save all products to localStorage
const saveProducts = (products) => {
  localStorage.setItem('products', JSON.stringify(products));
};

// Update product stock (deduct when order is placed)
const updateProductStock = (productId, quantityPurchased) => {
  const products = getProducts();
  const updatedProducts = products.map(product => {
    if (product.id === productId) {
      // Deduct the purchased quantity from stock
      const newStock = Math.max(0, (product.stock || 0) - quantityPurchased);
      console.log(`📦 Stock updated: ${product.name} - Old: ${product.stock}, New: ${newStock}`);
      return { ...product, stock: newStock };
    }
    return product;
  });
  saveProducts(updatedProducts);
  return updatedProducts;
};

// ========================================
// ORDER FUNCTIONS (CONTINUED)
// ========================================

// Add a new order (with stock deduction)
export const addOrder = (order) => {
  const orders = getAllOrders();
  
  const newOrder = {
    ...order,
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    timestamp: new Date().toISOString(),
    status: order.status || 'Pending'
  };
  
  // ✅ DEDUCT STOCK FOR EACH ITEM IN THE ORDER
  if (newOrder.items && newOrder.items.length > 0) {
    console.log("🛒 Order placed - deducting stock for items:", newOrder.items);
    newOrder.items.forEach(item => {
      updateProductStock(item.id, item.quantity);
    });
  }
  
  const updatedOrders = [...orders, newOrder];
  saveOrders(updatedOrders);
  
  // Also create a payment record
  const payments = getAllPayments();
  const newPayment = {
    orderId: newOrder.id,
    customer: newOrder.customerName,
    amount: newOrder.total,
    status: 'Pending',
    date: newOrder.date
  };
  savePayments([...payments, newPayment]);
  
  return newOrder;
};

// Update order status
export const updateOrderStatus = (orderId, status) => {
  const orders = getAllOrders();
  const updatedOrders = orders.map(order => 
    order.id === orderId ? { ...order, status } : order
  );
  saveOrders(updatedOrders);
};

// Get orders by customer
export const getOrdersByCustomer = (customerEmail) => {
  const orders = getAllOrders();
  return orders.filter(order => order.customerEmail === customerEmail);
};

// ========================================
// PAYMENT FUNCTIONS
// ========================================

export const getAllPayments = () => {
  const payments = localStorage.getItem('payments');
  return payments ? JSON.parse(payments) : [];
};

const savePayments = (payments) => {
  localStorage.setItem('payments', JSON.stringify(payments));
};

export const updatePaymentStatus = (orderId, status) => {
  const payments = getAllPayments();
  const updatedPayments = payments.map(payment => 
    payment.orderId === orderId ? { ...payment, status } : payment
  );
  savePayments(updatedPayments);
};

// ========================================
// STOCK CHECKING FUNCTIONS
// ========================================

// Get single product
export const getProduct = (productId) => {
  const products = getProducts();
  return products.find(p => p.id === productId);
};

// Check if product has enough stock
export const hasEnoughStock = (productId, quantity) => {
  const product = getProduct(productId);
  return product && (product.stock || 0) >= quantity;
};

// Manually deduct stock (if needed elsewhere)
export const deductStockManually = (productId, quantity) => {
  return updateProductStock(productId, quantity);
};

// Add stock back (for returns/cancellations)
export const addStockBack = (productId, quantity) => {
  const products = getProducts();
  const updatedProducts = products.map(product => {
    if (product.id === productId) {
      return { ...product, stock: (product.stock || 0) + quantity };
    }
    return product;
  });
  saveProducts(updatedProducts);
  return updatedProducts;
};