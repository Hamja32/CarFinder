import React from "react";

const filterPannel = ({
  filters,
  onFilterChange,
  brands,
  fuelTypes,
  seatingOptions,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-7 space-y-3 sticky top-14">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
        🔎 Filter Cars
      </h2>

      {/* Brand Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Brand
        </label>
        <select
          value={filters.brand}
          onChange={(e) => onFilterChange("brand", e.target.value)}
          className="w-full mt-1 p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Price Range (₹)
        </label>
        <div className="flex gap-2 mt-1">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceMin}
            onChange={(e) => onFilterChange("priceMin", e.target.value)}
            className="w-1/2 p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.priceMax}
            onChange={(e) => onFilterChange("priceMax", e.target.value)}
            className="w-1/2 p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Fuel Type Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Fuel Type
        </label>
        <select
          value={filters.fuelType}
          onChange={(e) => onFilterChange("fuelType", e.target.value)}
          className="w-full mt-1 p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          <option value="">All Types</option>
          {fuelTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Seating Capacity Filter */}
      {/* Seating Capacity Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Seating Capacity
        </label>
        <select
          value={filters.seatingCapacity}
          onChange={(e) =>
            onFilterChange(
              "seatingCapacity",
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
          className="w-full mt-1 p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          <option value="">Any</option>
          {seatingOptions.map((seat) => (
            <option key={seat} value={seat}>
              {seat} Seater
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default filterPannel;
