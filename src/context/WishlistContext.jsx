import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const WishlistContext = createContext();

// Custom hook for easier access
export const useWishlist = () => useContext(WishlistContext);

// Provider
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Add this inside WishlistProvider component
  const removeFromWishlist = (carId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== carId));
  };

  // Add or remove car from wishlist
  const toggleWishlist = (car) => {
    const exists = wishlist.find((item) => item.id === car.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== car.id));
    } else {
      setWishlist((prev) => [...prev, car]);
    }
  };

  // Check if a car is in the wishlist
  const isWishlisted = (carId) => wishlist.some((item) => item.id === carId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
        removeFromWishlist, // ✅ now added
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
