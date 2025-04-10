import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
  const { wishlist } = useWishlist();

  return (
    <nav className="bg-white dark:bg-gray-600 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-3 lg:px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-xl font-bold text-blue-600 dark:text-white"
          >
            🚗 CarFinder
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? "text-blue-600 dark:text-white"
                    : "text-gray-700 dark:text-gray-300"
                } hover:text-blue-500 transition`
              }
            >
              Home
            </NavLink>

            {/* Wishlist Link with Icon and Counter */}
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                `relative flex items-center gap-1 text-sm font-medium ${
                  isActive
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-700 dark:text-gray-300"
                } hover:text-red-500 transition`
              }
            >
              <FaHeart size={18} />
              <span>Wishlist</span>

              {/* Counter Badge */}
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
