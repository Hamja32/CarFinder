export const fetchCars = async (filters = {}, search = "") => {
  try {
    const response = await fetch("/cars.json"); // This assumes cars.json is in public/
    const data = await response.json();

    // Filtering logic
    let filtered = data;

    if (filters.brand) {
      filtered = filtered.filter(
        (car) => car.brand.toLowerCase() === filters.brand.toLowerCase()
      );
    }

    if (filters.fuelType) {
      filtered = filtered.filter(
        (car) => car.fuelType.toLowerCase() === filters.fuelType.toLowerCase()
      );
    }

    if (filters.seating) {
      filtered = filtered.filter(
        (car) => car.seating === parseInt(filters.seating)
      );
    }

    if (filters.priceMin && filters.priceMax) {
      filtered = filtered.filter(
        (car) => car.price >= filters.priceMin && car.price <= filters.priceMax
      );
    }

    if (search) {
      filtered = filtered.filter(
        (car) =>
          car.name.toLowerCase().includes(search.toLowerCase()) ||
          car.brand.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};
