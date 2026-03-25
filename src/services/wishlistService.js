// src/services/wishlistService.js

// Get wishlist from localStorage
export const getWishlist = () => {
  const wishlist = localStorage.getItem('wishlist');
  return wishlist ? JSON.parse(wishlist) : [];
};

// Save wishlist to localStorage
const saveWishlist = (wishlist) => {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
};

// Add item to wishlist
export const addToWishlist = (product) => {
  const wishlist = getWishlist();
  
  // Check if product already exists in wishlist
  const exists = wishlist.some(item => item.id === product.id);
  
  if (!exists) {
    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
      category: product.category,
      addedAt: new Date().toISOString()
    };
    
    const updatedWishlist = [...wishlist, newItem];
    saveWishlist(updatedWishlist);
    return { success: true, message: 'Added to wishlist' };
  }
  
  return { success: false, message: 'Item already in wishlist' };
};

// Remove from wishlist
export const removeFromWishlist = (productId) => {
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.filter(item => item.id !== productId);
  saveWishlist(updatedWishlist);
  return { success: true, message: 'Removed from wishlist' };
};

// Clear wishlist
export const clearWishlist = () => {
  localStorage.removeItem('wishlist');
  return { success: true, message: 'Wishlist cleared' };
};