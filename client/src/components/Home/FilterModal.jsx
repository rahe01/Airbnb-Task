import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import AirbnbSlider from "./AirbnbSlider"; // Import the AirbnbSlider component
import axios from "axios";

const FilterModal = ({ isOpen, closeModal, onApplyFilter }) => {
  const [priceRange, setPriceRange] = useState([10, 4300]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  // Fetch rooms based on the price range
  useEffect(() => {
    const fetchFilteredRooms = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/rooms/price-range?minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`
        );
        setFilteredRooms(response.data);
      } catch (error) {
        console.error("Error fetching filtered rooms:", error);
      }
    };

    // Fetch rooms if the modal is open
    if (isOpen) {
      fetchFilteredRooms();
    }
  }, [priceRange, isOpen]);

  const handleClearAll = () => {
    setPriceRange([10, 4300]);
  };

  const handleApplyFilter = () => {
    onApplyFilter(filteredRooms); // Apply filtered rooms when button clicked
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl w-full max-w-4xl p-8 overflow-auto max-h-[90vh]">
        <div className="flex items-center justify-between mb-6">
          <button onClick={closeModal} className="text-2xl">
            <IoClose />
          </button>
          <h2 className="text-xl font-semibold text-center flex-1">Filters</h2>
        </div>
        <hr className="border-t border-gray-300 mb-6" />

        {/* Price Range Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Price range</h3>
          <p className="text-sm text-gray-600">Nightly prices before fees and taxes</p>
          <div className="mt-4">
            {/* Airbnb Slider Component */}
            <AirbnbSlider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              min={10}
              max={4300}
            />
            <div className="flex justify-between text-center mt-2">
              <span className="flex flex-col text-sm">Minimum <button className="btn btnglass rounded-3xl ">${priceRange[0]}</button></span>
              <span className="flex flex-col text-sm">Maximum <button className="btn btnglass rounded-3xl ">${priceRange[1]}+</button></span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleClearAll}
            className="px-4 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Clear all
          </button>
          <button
            onClick={handleApplyFilter} // Apply filter and close modal
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
          >
            Show {filteredRooms.length} places
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
