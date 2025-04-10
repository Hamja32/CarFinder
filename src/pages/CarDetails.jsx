import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlist();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch("/cars.json"); // Replace with your API if needed
        const data = await res.json();
        const selectedCar = data.find((c) => c.id.toString() === id);
        setCar(selectedCar);
      } catch (error) {
        console.error("Failed to load car details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-300 mt-10">
        Loading car details...
      </div>
    );
  }

  if (!car) {
    return <div className="text-center text-red-600 mt-10">Car not found.</div>;
  }

  const isWishlisted = wishlist.some((item) => item.id === car.id);

  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-600 hover:bg-gray-600 hover:text-black hover:bg-[#fffada] text-white rounded shadow"
      >
        ← Back
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-6">
        {/* Car Image */}
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src={car.image}
            alt={car.name}
            className="rounded-lg w-full h-auto max-h-[400px] object-cover"
          />
        </div>

        {/* Car Info */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {car.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {car.brand}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">
                Fuel Type:
              </span>
              <br />
              <span className="text-gray-800 dark:text-white">
                {car.fuelType}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Seating:</span>
              <br />
              <span className="text-gray-800 dark:text-white">
                {car.seating} Seater
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">
                Transmission:
              </span>
              <br />
              <span className="text-gray-800 dark:text-white">
                {car.transmission}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">
                Top Speed:
              </span>
              <br />
              <span className="text-gray-800 dark:text-white">
                {car.topSpeed} km/h
              </span>
            </div>
          </div>

          <p className="text-xl font-semibold text-blue-600 dark:text-blue-400 mt-2">
            ₹ {car.price.toLocaleString()}
          </p>

          <button
            onClick={() => toggleWishlist(car)}
            className={`px-4 py-2 rounded text-white transition-all shadow ${
              isWishlisted
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-600 hover:bg-green-800"
            }`}
          >
            {isWishlisted ? "Remove from Wishlist ❤️" : "Add to Wishlist 🤍"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
