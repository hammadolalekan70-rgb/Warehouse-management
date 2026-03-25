// src/services/productService.js

// Get all products
export const getAllProducts = () => {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
};

// Save all products
export const saveProducts = (products) => {
  localStorage.setItem('products', JSON.stringify(products));
};

// Get single product
export const getProduct = (productId) => {
  const products = getAllProducts();
  return products.find(p => p.id === productId);
};

// Update product
export const updateProduct = (productId, updatedData) => {
  const products = getAllProducts();
  const updatedProducts = products.map(product => 
    product.id === productId ? { ...product, ...updatedData } : product
  );
  saveProducts(updatedProducts);
  return updatedProducts;
};

// Deduct stock (called when order is placed)
export const deductStock = (productId, quantity) => {
  const products = getAllProducts();
  const updatedProducts = products.map(product => {
    if (product.id === productId) {
      const newStock = Math.max(0, (product.stock || 0) - quantity);
      return { ...product, stock: newStock };
    }
    return product;
  });
  saveProducts(updatedProducts);
  return updatedProducts;
};

// Add stock (called when order is cancelled or returned)
export const addStock = (productId, quantity) => {
  const products = getAllProducts();
  const updatedProducts = products.map(product => {
    if (product.id === productId) {
      return { ...product, stock: (product.stock || 0) + quantity };
    }
    return product;
  });
  saveProducts(updatedProducts);
  return updatedProducts;
};

// Check if product has enough stock
export const hasEnoughStock = (productId, quantity) => {
  const product = getProduct(productId);
  return product && (product.stock || 0) >= quantity;
};