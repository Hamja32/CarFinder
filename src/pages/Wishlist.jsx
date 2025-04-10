import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { FaHeartBroken } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Your Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-600 dark:text-gray-300 mt-20">
          <FaHeartBroken size={50} className="mb-4 text-red-500" />
          <p className="text-xl">Your wishlist is empty.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Browse Cars
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((car) => (
            <div
              key={car.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mt-2">
                {car.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {car.brand} | {car.fuelType} | ₹{car.price.toLocaleString()}
              </p>
              <button
                onClick={() => removeFromWishlist(car.id)}
                className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
