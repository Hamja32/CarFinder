import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CarCard = ({ car, isWishlisted, toggleWishlist, onViewDetails }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden transition transform hover:scale-105 duration-300">
      <img
        src={car.image}
        alt={car.name}
        className="w-full h-48 object-cover"
        onClick={() => onViewDetails(car)}
      />

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2
            className="text-xl font-semibold cursor-pointer text-gray-800 dark:text-white"
            onClick={() => onViewDetails(car)}
          >
            {car.name}
          </h2>

          <button
            className="text-red-500 hover:scale-110 transition"
            onClick={() => toggleWishlist(car)}
          >
            {isWishlisted ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm">
          <strong>Brand:</strong> {car.brand}
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          <strong>Fuel:</strong> {car.fuelType}
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          <strong>Seats:</strong> {car.seating}
        </p>
        <p className="text-gray-900 dark:text-white font-bold mt-2">
          ₹ {car.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CarCard;
