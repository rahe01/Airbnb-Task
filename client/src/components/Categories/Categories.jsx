import { useState, useEffect } from "react";
import axios from "axios"; 
import Container from "../Shared/Container";
import CategoryBox from "./CategoryBox";
import { categories } from "./CategoriesData";
import { Switch } from "@headlessui/react";
import { RiSoundModuleFill } from "react-icons/ri";
import FilterModal from "../Home/FilterModal";
import Card from "../Home/Card";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const Categories = () => {
  const [isBeforeTax, setIsBeforeTax] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([]); // Store filtered data
  const [rooms, setRooms] = useState([]); // Store all rooms

  useEffect(() => {
    // Fetch rooms when component mounts
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${VITE_API_URL}/rooms`);
        setRooms(response.data);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  // Function to handle toggle change for tax status
  const handleToggleChange = async (value) => {
    setIsBeforeTax(value);

    try {
      // Send a PATCH request to update tax status in the DB
      const response = await axios.patch(
        `${VITE_API_URL}/rooms/update-tax-status`,
        { priceWithTaxShow: value },
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log("Database updated successfully");
      } else {
        console.error("Failed to update database");
      }
    } catch (error) {
      console.error("Error updating database:", error);
    }
  };

  // Function to open the modal
  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  // Function to close the modal
  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  // Function to update filtered rooms when closing modal
  const handleFilteredRoomsUpdate = (rooms) => {
    setFilteredRooms(rooms);
    setIsFilterModalOpen(false); // Close modal after applying filter
  };

  return (
    <Container>
      <div className="flex justify-center items-center">
        <div className="flex-auto">
          <div className="relative mt-4">
            <div className="flex flex-wrap justify-between">
              {categories.map((item) => (
                <CategoryBox key={item.label} label={item.label} icon={item.icon} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="pt-4 flex justify-between items-center overflow-hidden">
            <div className="flex items-center">
              {/* Filter Button to open the modal */}
              <button
                onClick={openFilterModal}
                className="ml-4 rounded-2xl bg-white p-3 text-black border hover:border-black border-gray-400 hover:bg-gray-200 flex items-center"
              >
                <RiSoundModuleFill className="mr-1" />
                Filter
              </button>

              {/* Toggle for Before/After Tax */}
              <div className="ml-4 rounded-2xl bg-white p-3 text-black border hover:border-black border-gray-400 hover:bg-gray-200 flex items-center">
                <Switch
                  checked={isBeforeTax}
                  onChange={handleToggleChange}
                  className={`${isBeforeTax ? "bg-red-300" : "bg-gray-300"}
                  relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200`}
                >
                  <span className="sr-only">Toggle Total Before Taxes</span>
                  <span
                    className={`${
                      isBeforeTax ? "translate-x-6" : "translate-x-1"
                    } inline-block w-4 h-4 bg-white rounded-full transition-transform duration-200`}
                  />
                </Switch>
                <span className="ml-2 text-sm">
                  {isBeforeTax
                    ? "Showing Total Before Taxes"
                    : "Showing Total With Taxes"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Show Filtered Results */}
      {filteredRooms.length > 0 && (
  <div className="pt-12">
    <h3 className="text-lg font-semibold mb-4">Filtered Rooms: By Price</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 border-b-2 border-red-400 mt-4">
      {filteredRooms.map((room) => (
        <Card room={room} key={room._id} />
      ))}
    </div>
  </div>
)}


      {/* Filter Modal */}
      <FilterModal 
        isOpen={isFilterModalOpen} 
        closeModal={closeFilterModal} 
        onApplyFilter={handleFilteredRoomsUpdate} // Pass function to update filtered rooms
      />
    </Container>
  );
};

export default Categories;
