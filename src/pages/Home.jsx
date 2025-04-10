import React, { useEffect, useState } from "react";
import FilterPanel from "../components/filterPannel";
import CarCard from "../components/CarCard";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: "",
    priceMin: "",
    priceMax: "",
    fuelType: "",
    seatingCapacity: "",
    sort: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;

  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  // Fetch cars from API (mock or real)
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await fetch("/cars.json"); // Replace with your API endpoint if needed
        const data = await response.json();
        setCars(data);
        setFilteredCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // Filter & sort logic
  useEffect(() => {
    let filtered = [...cars];

    if (filters.brand) {
      filtered = filtered.filter((car) => car.brand === filters.brand);
    }

    if (filters.fuelType) {
      filtered = filtered.filter((car) => car.fuelType === filters.fuelType);
    }

    if (filters.seatingCapacity) {
      filtered = filtered.filter(
        (car) => car.seatingCapacity === parseInt(filters.seatingCapacity)
      );
    }

    if (filters.priceMin) {
      filtered = filtered.filter(
        (car) => car.price >= parseInt(filters.priceMin)
      );
    }

    if (filters.priceMax) {
      filtered = filtered.filter(
        (car) => car.price <= parseInt(filters.priceMax)
      );
    }

    if (filters.sort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredCars(filtered);
    setCurrentPage(1); // reset page when filters change
  }, [filters, cars]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleViewDetails = (car) => {
    navigate(`/car/${car.id}`);
  };

  // Pagination logic
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  return (
    <div className="container mx-auto px-3 m-3">
      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="col-span-1">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            brands={[...new Set(cars.map((car) => car.brand))]}
            fuelTypes={[...new Set(cars.map((car) => car.fuelType))]}
            seatingOptions={[2, 4, 5, 6, 7, 8]}
          />

          {/* Sort Options */}
          <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md fixed w-[20%]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sort by Price
            </label>
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value="">None</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </div>
        </div>

        {/* Car List */}
        <div className="col-span-3">
          {loading ? (
            <div className="text-center text-gray-600 dark:text-gray-300">
              Loading cars...
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    isWishlisted={wishlist.some((item) => item.id === car.id)}
                    toggleWishlist={toggleWishlist}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
