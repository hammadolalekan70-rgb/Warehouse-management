// src/contexts/ProductContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within ProductProvider');
  return context;
};

// Initial products with cost and sell prices
const initialProducts = [
  { id: 1, name: "Coca-Cola", brand: "Coca-Cola", category: "Soft Drink", costPrice: 400, sellingPrice: 500, price: 500, stock: 150, image: "images-1.jpg" },
  { id: 2, name: "Fanta", brand: "Fanta", category: "Soft Drink", costPrice: 350, sellingPrice: 450, price: 450, stock: 200, image: "images-2.jpg" },
  { id: 3, name: "Sprite", brand: "Sprite", category: "Soft Drink", costPrice: 350, sellingPrice: 450, price: 450, stock: 180, image: "images-3.jpg" },
  { id: 4, name: "Pepsi", brand: "Pepsi", category: "Soft Drink", costPrice: 380, sellingPrice: 480, price: 480, stock: 120, image: "images-4.png" },
  { id: 5, name: "7Up", brand: "7Up", category: "Soft Drink", costPrice: 350, sellingPrice: 450, price: 450, stock: 90, image: "images-5.jpg" },
  { id: 6, name: "Coca-Cola Can", brand: "Coca-Cola", category: "Soft Drink", costPrice: 220, sellingPrice: 300, price: 300, stock: 200, image: "images-10.jpg" },
  { id: 7, name: "Fanta Exotic", brand: "Fanta", category: "Soft Drink", costPrice: 400, sellingPrice: 500, price: 500, stock: 150, image: "images-11.jpg" },
  { id: 8, name: "Pepsi Can", brand: "Pepsi", category: "Soft Drink", costPrice: 220, sellingPrice: 300, price: 300, stock: 180, image: "images-12.jpg" },
  { id: 9, name: "Eva Water", brand: "Eva", category: "Water", costPrice: 200, sellingPrice: 300, price: 300, stock: 500, image: "images-8.jpg" },
  { id: 10, name: "Aquafina", brand: "Aquafina", category: "Water", costPrice: 200, sellingPrice: 300, price: 300, stock: 450, image: "images-9.png" },
  { id: 11, name: "Mirinda", brand: "Mirinda", category: "Soft Drink", costPrice: 350, sellingPrice: 450, price: 450, stock: 100, image: "images-13.jpg" },
  { id: 12, name: "Mountain Dew", brand: "Mountain Dew", category: "Soft Drink", costPrice: 380, sellingPrice: 480, price: 480, stock: 120, image: "images-14.jpg" },
  { id: 13, name: "Schweppes", brand: "Schweppes", category: "Soft Drink", costPrice: 400, sellingPrice: 500, price: 500, stock: 80, image: "images-15.jpg" },
  { id: 14, name: "Predator Energy", brand: "Predator", category: "Energy", costPrice: 480, sellingPrice: 600, price: 600, stock: 70, image: "images-18.jpg" },
  { id: 15, name: "Red Bull", brand: "Red Bull", category: "Energy", costPrice: 650, sellingPrice: 800, price: 800, stock: 60, image: "images-7.jpg" },
  { id: 16, name: "Hollandia Yoghurt", brand: "Hollandia", category: "Dairy", costPrice: 550, sellingPrice: 700, price: 700, stock: 60, image: "images-16.jpg" },
  { id: 17, name: "5Alive Juice", brand: "5Alive", category: "Juice", costPrice: 400, sellingPrice: 500, price: 500, stock: 90, image: "images-17.jpg" },
  { id: 18, name: "Chivita Juice", brand: "Chivita", category: "Juice", costPrice: 480, sellingPrice: 600, price: 600, stock: 85, image: "images-19.jpg" },
  { id: 19, name: "Malta Guinness", brand: "Malta", category: "Energy", costPrice: 400, sellingPrice: 500, price: 500, stock: 75, image: "images-6.jpg" },
  { id: 20, name: "Fearless Energy", brand: "Fearless", category: "Energy", costPrice: 520, sellingPrice: 650, price: 650, stock: 55, image: "images-20.jpg" }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Load products from localStorage on startup
  useEffect(() => {
    const stored = localStorage.getItem('products');
    if (stored) {
      setProducts(JSON.parse(stored));
      console.log("📦 Products loaded from localStorage:", JSON.parse(stored).length);
    } else {
      setProducts(initialProducts);
      localStorage.setItem('products', JSON.stringify(initialProducts));
      console.log("📦 Initial products saved to localStorage");
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
      console.log("💾 Products saved to localStorage");
    }
  }, [products]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      costPrice: Number(product.costPrice),
      sellingPrice: Number(product.sellingPrice),
      price: Number(product.sellingPrice),
      stock: Number(product.stock)
    };
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(prev => 
      prev.map(p => p.id === id ? { 
        ...p, 
        ...updatedProduct,
        price: updatedProduct.sellingPrice || updatedProduct.price || p.price 
      } : p)
    );
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getProduct = (id) => {
    return products.find(p => p.id === id);
  };

  // Manually deduct stock
  const deductStock = (productId, quantity) => {
    setProducts(prev => 
      prev.map(p => 
        p.id === productId 
          ? { ...p, stock: Math.max(0, (p.stock || 0) - quantity) }
          : p
      )
    );
  };

  // Add stock back
  const addStock = (productId, quantity) => {
    setProducts(prev => 
      prev.map(p => 
        p.id === productId 
          ? { ...p, stock: (p.stock || 0) + quantity }
          : p
      )
    );
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    deductStock,
    addStock
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};