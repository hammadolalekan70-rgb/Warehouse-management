// src/pages/hidden/AdminProducts.jsx
import React, { useState, useEffect } from "react";
import { useProducts } from "../../contexts/ProductContext";

// Import all images for preview
import images1 from "../../assets/images-1.jpg";
import images2 from "../../assets/images-2.jpg";
import images3 from "../../assets/images-3.jpg";
import images4 from "../../assets/images-4.png";
import images5 from "../../assets/images-5.jpg";
import images6 from "../../assets/images-6.jpg";
import images7 from "../../assets/images-7.jpg";
import images8 from "../../assets/images-8.jpg";
import images9 from "../../assets/images-9.png";
import images10 from "../../assets/images-10.jpg";
import images11 from "../../assets/images-11.jpg";
import images12 from "../../assets/images-12.jpg";
import images13 from "../../assets/images-13.jpg";
import images14 from "../../assets/images-14.jpg";
import images15 from "../../assets/images-15.jpg";
import images16 from "../../assets/images-16.jpg";
import images17 from "../../assets/images-17.jpg";
import images18 from "../../assets/images-18.jpg";
import images19 from "../../assets/images-19.jpg";
import images20 from "../../assets/images-20.jpg";

// Map image filenames to actual imports
const imageMap = {
  "images-1.jpg": images1,
  "images-2.jpg": images2,
  "images-3.jpg": images3,
  "images-4.png": images4,
  "images-5.jpg": images5,
  "images-6.jpg": images6,
  "images-7.jpg": images7,
  "images-8.jpg": images8,
  "images-9.png": images9,
  "images-10.jpg": images10,
  "images-11.jpg": images11,
  "images-12.jpg": images12,
  "images-13.jpg": images13,
  "images-14.jpg": images14,
  "images-15.jpg": images15,
  "images-16.jpg": images16,
  "images-17.jpg": images17,
  "images-18.jpg": images18,
  "images-19.jpg": images19,
  "images-20.jpg": images20
};

function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    category: "",
    costPrice: "",     // Price you bought it for
    sellingPrice: "",  // Price you sell it for
    stock: "",
    description: "",
    image: "images-1.jpg"
  });

  // Filter products based on search and filters
  useEffect(() => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    if (brandFilter !== "all") {
      filtered = filtered.filter(p => p.brand === brandFilter);
    }

    if (stockFilter === "low") {
      filtered = filtered.filter(p => p.stock < 50);
    } else if (stockFilter === "medium") {
      filtered = filtered.filter(p => p.stock >= 50 && p.stock < 200);
    } else if (stockFilter === "high") {
      filtered = filtered.filter(p => p.stock >= 200);
    } else if (stockFilter === "out") {
      filtered = filtered.filter(p => p.stock === 0);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, categoryFilter, brandFilter, stockFilter]);

  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];

  // Calculate profit and margin
  const calculateProfit = (costPrice, sellingPrice) => {
    if (!costPrice || !sellingPrice) return { profit: 0, margin: 0 };
    const profit = sellingPrice - costPrice;
    const margin = ((profit / sellingPrice) * 100).toFixed(1);
    return { profit, margin };
  };

  // Calculate statistics with profit
  const stats = {
    total: products.length,
    totalStock: products.reduce((sum, p) => sum + (p.stock || 0), 0),
    lowStock: products.filter(p => p.stock < 50).length,
    outOfStock: products.filter(p => p.stock === 0).length,
    totalCost: products.reduce((sum, p) => sum + ((p.costPrice || 0) * p.stock), 0),
    totalValue: products.reduce((sum, p) => sum + ((p.sellingPrice || p.price || 0) * p.stock), 0),
    totalProfit: products.reduce((sum, p) => {
      const cost = p.costPrice || 0;
      const sell = p.sellingPrice || p.price || 0;
      return sum + ((sell - cost) * p.stock);
    }, 0),
    categories: categories.length,
    brands: brands.length
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.sellingPrice || !newProduct.stock) {
      alert("Please fill in all required fields");
      return;
    }

    const product = {
      id: Date.now(),
      ...newProduct,
      costPrice: Number(newProduct.costPrice) || 0,
      sellingPrice: Number(newProduct.sellingPrice),
      price: Number(newProduct.sellingPrice), // For backward compatibility
      stock: Number(newProduct.stock)
    };

    addProduct(product);
    setNewProduct({
      name: "",
      brand: "",
      category: "",
      costPrice: "",
      sellingPrice: "",
      stock: "",
      description: "",
      image: "images-1.jpg"
    });
    setShowAddModal(false);
  };

  const handleEditProduct = () => {
    if (!selectedProduct) return;
    
    // Ensure both prices are updated
    const updatedProduct = {
      ...selectedProduct,
      price: selectedProduct.sellingPrice // Keep backward compatibility
    };
    
    updateProduct(selectedProduct.id, updatedProduct);
    setShowEditModal(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  const handleBulkPriceUpdate = (percentage) => {
    if (window.confirm(`Update all selling prices by ${percentage}%?`)) {
      products.forEach(product => {
        const newPrice = Math.round((product.sellingPrice || product.price || 0) * (1 + percentage / 100));
        updateProduct(product.id, { 
          ...product, 
          sellingPrice: newPrice,
          price: newPrice 
        });
      });
    }
  };

  const handleBulkCostUpdate = (percentage) => {
    if (window.confirm(`Update all cost prices by ${percentage}%?`)) {
      products.forEach(product => {
        const newCost = Math.round((product.costPrice || 0) * (1 + percentage / 100));
        updateProduct(product.id, { ...product, costPrice: newCost });
      });
    }
  };

  const handleBulkStockUpdate = (amount) => {
    if (window.confirm(`Add ${amount} to all stock levels?`)) {
      products.forEach(product => {
        const newStock = (product.stock || 0) + amount;
        updateProduct(product.id, { ...product, stock: newStock });
      });
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { label: "Out of Stock", class: "out" };
    if (stock < 50) return { label: "Low Stock", class: "low" };
    if (stock < 200) return { label: "Medium Stock", class: "medium" };
    return { label: "High Stock", class: "high" };
  };

  const formatNaira = (amount) => {
    return `₦${amount?.toLocaleString() || 0}`;
  };

  return (
    <div className="admin-products">
      <div className="products-header">
        <h1>Product Management</h1>
        
        {/* Statistics Cards with Profit */}
        <div className="products-stats">
          <div className="stat-card">
            <span className="stat-label">Total Products</span>
            <span className="stat-value">{stats.total}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Stock</span>
            <span className="stat-value">{stats.totalStock}</span>
          </div>
          <div className="stat-card warning">
            <span className="stat-label">Low Stock</span>
            <span className="stat-value">{stats.lowStock}</span>
          </div>
          <div className="stat-card danger">
            <span className="stat-label">Out of Stock</span>
            <span className="stat-value">{stats.outOfStock}</span>
          </div>
          <div className="stat-card profit">
            <span className="stat-label">Total Cost</span>
            <span className="stat-value">{formatNaira(stats.totalCost)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Inventory Value</span>
            <span className="stat-value">{formatNaira(stats.totalValue)}</span>
          </div>
          <div className="stat-card highlight">
            <span className="stat-label">Potential Profit</span>
            <span className="stat-value">{formatNaira(stats.totalProfit)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Categories</span>
            <span className="stat-value">{stats.categories}</span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="products-action-bar">
        <button className="add-product-btn" onClick={() => setShowAddModal(true)}>
          ➕ Add New Product
        </button>
        
        <div className="bulk-actions">
          <span className="bulk-label">Bulk Actions:</span>
          <button className="bulk-btn" onClick={() => handleBulkPriceUpdate(10)}>
            +10% Sell Price
          </button>
          <button className="bulk-btn" onClick={() => handleBulkPriceUpdate(-10)}>
            -10% Sell Price
          </button>
          <button className="bulk-btn" onClick={() => handleBulkCostUpdate(10)}>
            +10% Cost Price
          </button>
          <button className="bulk-btn" onClick={() => handleBulkCostUpdate(-10)}>
            -10% Cost Price
          </button>
          <button className="bulk-btn" onClick={() => handleBulkStockUpdate(10)}>
            +10 Stock
          </button>
          <button className="bulk-btn" onClick={() => handleBulkStockUpdate(-10)}>
            -10 Stock
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label>Category:</label>
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Brand:</label>
          <select 
            value={brandFilter} 
            onChange={(e) => setBrandFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Stock Level:</label>
          <select 
            value={stockFilter} 
            onChange={(e) => setStockFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Stock</option>
            <option value="low">Low Stock (&lt;50)</option>
            <option value="medium">Medium Stock (50-199)</option>
            <option value="high">High Stock (200+)</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>

        {(searchTerm || categoryFilter !== "all" || brandFilter !== "all" || stockFilter !== "all") && (
          <button 
            className="clear-filters-btn"
            onClick={() => {
              setSearchTerm("");
              setCategoryFilter("all");
              setBrandFilter("all");
              setStockFilter("all");
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Products Table */}
      <div className="products-table-container">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>No products found</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Cost (₦)</th>
                <th>Sell (₦)</th>
                <th>Profit</th>
                <th>Margin</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => {
                const stockStatus = getStockStatus(product.stock);
                const cost = product.costPrice || 0;
                const sell = product.sellingPrice || product.price || 0;
                const { profit, margin } = calculateProfit(cost, sell);
                const profitClass = profit > 0 ? 'positive' : profit < 0 ? 'negative' : 'zero';
                
                return (
                  <tr key={product.id}>
                    <td>#{product.id}</td>
                    <td>
                      <div className="product-image-cell">
                        <img 
                          src={imageMap[product.image]} 
                          alt={product.name}
                          className="product-thumbnail"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/50?text=No+Image";
                          }}
                        />
                      </div>
                    </td>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{product.category}</td>
                    <td className="cost-price">{formatNaira(cost)}</td>
                    <td className="sell-price">{formatNaira(sell)}</td>
                    <td className={`profit ${profitClass}`}>
                      {formatNaira(profit)}
                    </td>
                    <td className={`margin ${profitClass}`}>
                      {margin}%
                    </td>
                    <td>
                      <input
                        type="number"
                        value={product.stock}
                        onChange={(e) => {
                          const newStock = Number(e.target.value);
                          updateProduct(product.id, { ...product, stock: newStock });
                        }}
                        className="stock-input"
                        min="0"
                      />
                    </td>
                    <td>
                      <span className={`stock-badge ${stockStatus.class}`}>
                        {stockStatus.label}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="edit-btn"
                          onClick={() => {
                            setSelectedProduct({
                              ...product,
                              costPrice: product.costPrice || 0,
                              sellingPrice: product.sellingPrice || product.price || 0
                            });
                            setShowEditModal(true);
                          }}
                        >
                          ✏️
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content product-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Product</h2>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Brand *</label>
                  <input
                    type="text"
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                    placeholder="Enter brand name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Soft Drink">Soft Drink</option>
                    <option value="Energy">Energy</option>
                    <option value="Water">Water</option>
                    <option value="Juice">Juice</option>
                    <option value="Dairy">Dairy</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Cost Price (₦) *</label>
                  <input
                    type="number"
                    value={newProduct.costPrice}
                    onChange={(e) => setNewProduct({...newProduct, costPrice: e.target.value})}
                    placeholder="What you paid"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Selling Price (₦) *</label>
                  <input
                    type="number"
                    value={newProduct.sellingPrice}
                    onChange={(e) => setNewProduct({...newProduct, sellingPrice: e.target.value})}
                    placeholder="What you sell for"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Stock Quantity *</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    placeholder="Enter stock quantity"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Image</label>
                  <select
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  >
                    <option value="images-1.jpg">Coca-Cola</option>
                    <option value="images-2.jpg">Fanta</option>
                    <option value="images-3.jpg">Sprite</option>
                    <option value="images-4.png">Pepsi</option>
                    <option value="images-5.jpg">7Up</option>
                    <option value="images-6.jpg">Malta</option>
                    <option value="images-7.jpg">Red Bull</option>
                    <option value="images-8.jpg">Eva Water</option>
                    <option value="images-9.png">Aquafina</option>
                    <option value="images-10.jpg">Coca-Cola Can</option>
                    <option value="images-11.jpg">Fanta Exotic</option>
                    <option value="images-12.jpg">Pepsi Can</option>
                    <option value="images-13.jpg">Mirinda</option>
                    <option value="images-14.jpg">Mountain Dew</option>
                    <option value="images-15.jpg">Schweppes</option>
                    <option value="images-16.jpg">Hollandia</option>
                    <option value="images-17.jpg">5Alive</option>
                    <option value="images-18.jpg">Predator</option>
                    <option value="images-19.jpg">Chivita</option>
                    <option value="images-20.jpg">Fearless</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    placeholder="Enter product description"
                    rows="3"
                  />
                </div>
              </div>

              {/* Profit Preview */}
              {newProduct.costPrice && newProduct.sellingPrice && (
                <div className="profit-preview">
                  <h3>Profit Preview</h3>
                  <div className="profit-calculator">
                    <div className="profit-item">
                      <span className="label">Cost Price:</span>
                      <span className="value cost">{formatNaira(Number(newProduct.costPrice))}</span>
                    </div>
                    <div className="profit-item">
                      <span className="label">Selling Price:</span>
                      <span className="value sell">{formatNaira(Number(newProduct.sellingPrice))}</span>
                    </div>
                    <div className="profit-item total">
                      <span className="label">Profit per unit:</span>
                      <span className={`value ${Number(newProduct.sellingPrice) - Number(newProduct.costPrice) > 0 ? 'positive' : 'negative'}`}>
                        {formatNaira(Number(newProduct.sellingPrice) - Number(newProduct.costPrice))}
                      </span>
                    </div>
                    <div className="profit-item">
                      <span className="label">Margin:</span>
                      <span className={`value ${((Number(newProduct.sellingPrice) - Number(newProduct.costPrice)) / Number(newProduct.sellingPrice) * 100) > 0 ? 'positive' : 'negative'}`}>
                        {((Number(newProduct.sellingPrice) - Number(newProduct.costPrice)) / Number(newProduct.sellingPrice) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="product-preview">
                <h3>Preview</h3>
                <div className="preview-card">
                  <img 
                    src={imageMap[newProduct.image] || images1} 
                    alt={newProduct.name}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/100?text=Preview";
                    }}
                  />
                  <div className="preview-details">
                    <h4>{newProduct.name || "Product Name"}</h4>
                    <p>{newProduct.brand} - {newProduct.category}</p>
                    <p className="preview-cost">Cost: {formatNaira(Number(newProduct.costPrice) || 0)}</p>
                    <p className="preview-price">Sell: {formatNaira(Number(newProduct.sellingPrice) || 0)}</p>
                    <p className="preview-stock">Stock: {newProduct.stock || 0}</p>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button className="save-btn" onClick={handleAddProduct}>
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content product-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Product</h2>
              <button className="close-btn" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    value={selectedProduct.name}
                    onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Brand *</label>
                  <input
                    type="text"
                    value={selectedProduct.brand}
                    onChange={(e) => setSelectedProduct({...selectedProduct, brand: e.target.value})}
                    placeholder="Enter brand name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={selectedProduct.category}
                    onChange={(e) => setSelectedProduct({...selectedProduct, category: e.target.value})}
                    required
                  >
                    <option value="Soft Drink">Soft Drink</option>
                    <option value="Energy">Energy</option>
                    <option value="Water">Water</option>
                    <option value="Juice">Juice</option>
                    <option value="Dairy">Dairy</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Cost Price (₦) *</label>
                  <input
                    type="number"
                    value={selectedProduct.costPrice}
                    onChange={(e) => setSelectedProduct({...selectedProduct, costPrice: Number(e.target.value)})}
                    placeholder="What you paid"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Selling Price (₦) *</label>
                  <input
                    type="number"
                    value={selectedProduct.sellingPrice}
                    onChange={(e) => setSelectedProduct({...selectedProduct, sellingPrice: Number(e.target.value)})}
                    placeholder="What you sell for"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Stock Quantity *</label>
                  <input
                    type="number"
                    value={selectedProduct.stock}
                    onChange={(e) => setSelectedProduct({...selectedProduct, stock: Number(e.target.value)})}
                    placeholder="Enter stock quantity"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Image</label>
                  <select
                    value={selectedProduct.image}
                    onChange={(e) => setSelectedProduct({...selectedProduct, image: e.target.value})}
                  >
                    <option value="images-1.jpg">Coca-Cola</option>
                    <option value="images-2.jpg">Fanta</option>
                    <option value="images-3.jpg">Sprite</option>
                    <option value="images-4.png">Pepsi</option>
                    <option value="images-5.jpg">7Up</option>
                    <option value="images-6.jpg">Malta</option>
                    <option value="images-7.jpg">Red Bull</option>
                    <option value="images-8.jpg">Eva Water</option>
                    <option value="images-9.png">Aquafina</option>
                    <option value="images-10.jpg">Coca-Cola Can</option>
                    <option value="images-11.jpg">Fanta Exotic</option>
                    <option value="images-12.jpg">Pepsi Can</option>
                    <option value="images-13.jpg">Mirinda</option>
                    <option value="images-14.jpg">Mountain Dew</option>
                    <option value="images-15.jpg">Schweppes</option>
                    <option value="images-16.jpg">Hollandia</option>
                    <option value="images-17.jpg">5Alive</option>
                    <option value="images-18.jpg">Predator</option>
                    <option value="images-19.jpg">Chivita</option>
                    <option value="images-20.jpg">Fearless</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    value={selectedProduct.description || ""}
                    onChange={(e) => setSelectedProduct({...selectedProduct, description: e.target.value})}
                    placeholder="Enter product description"
                    rows="3"
                  />
                </div>
              </div>

              {/* Profit Preview */}
              <div className="profit-preview">
                <h3>Profit Calculation</h3>
                <div className="profit-calculator">
                  <div className="profit-item">
                    <span className="label">Cost Price:</span>
                    <span className="value cost">{formatNaira(selectedProduct.costPrice || 0)}</span>
                  </div>
                  <div className="profit-item">
                    <span className="label">Selling Price:</span>
                    <span className="value sell">{formatNaira(selectedProduct.sellingPrice || 0)}</span>
                  </div>
                  <div className="profit-item total">
                    <span className="label">Profit per unit:</span>
                    <span className={`value ${(selectedProduct.sellingPrice - selectedProduct.costPrice) > 0 ? 'positive' : 'negative'}`}>
                      {formatNaira((selectedProduct.sellingPrice || 0) - (selectedProduct.costPrice || 0))}
                    </span>
                  </div>
                  <div className="profit-item">
                    <span className="label">Margin:</span>
                    <span className={`value ${((selectedProduct.sellingPrice - selectedProduct.costPrice) / selectedProduct.sellingPrice * 100) > 0 ? 'positive' : 'negative'}`}>
                      {selectedProduct.sellingPrice ? 
                        (((selectedProduct.sellingPrice - selectedProduct.costPrice) / selectedProduct.sellingPrice) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="profit-item total">
                    <span className="label">Total Profit (all stock):</span>
                    <span className={`value ${((selectedProduct.sellingPrice - selectedProduct.costPrice) * selectedProduct.stock) > 0 ? 'positive' : 'negative'}`}>
                      {formatNaira(((selectedProduct.sellingPrice || 0) - (selectedProduct.costPrice || 0)) * (selectedProduct.stock || 0))}
                    </span>
                  </div>
                </div>
              </div>

              <div className="product-preview">
                <h3>Preview</h3>
                <div className="preview-card">
                  <img 
                    src={imageMap[selectedProduct.image] || images1} 
                    alt={selectedProduct.name}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/100?text=Preview";
                    }}
                  />
                  <div className="preview-details">
                    <h4>{selectedProduct.name}</h4>
                    <p>{selectedProduct.brand} - {selectedProduct.category}</p>
                    <p className="preview-cost">Cost: {formatNaira(selectedProduct.costPrice || 0)}</p>
                    <p className="preview-price">Sell: {formatNaira(selectedProduct.sellingPrice || 0)}</p>
                    <p className="preview-profit">Profit: {formatNaira((selectedProduct.sellingPrice || 0) - (selectedProduct.costPrice || 0))}</p>
                    <p className="preview-stock">Stock: {selectedProduct.stock || 0}</p>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button className="save-btn" onClick={handleEditProduct}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;