import "./serch.css";
import { IoSearch } from "react-icons/io5";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Import the adapter

const SearchbarHtml = ({ setCheckInDate, setCheckOutDate, fetchRooms }) => {
  const [localCheckInDate, setLocalCheckInDate] = useState(null); // Start with no default date
  const [localCheckOutDate, setLocalCheckOutDate] = useState(null);

  // Function to handle the search action
  const handleSearch = () => {
    setCheckInDate(localCheckInDate);
    setCheckOutDate(localCheckOutDate);
    fetchRooms(localCheckInDate, localCheckOutDate); // Fetch rooms based on selected dates
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="bar">
        <div className="location">
          <p>Location</p>
          <input type="text" placeholder="Where are you going?" />
        </div>

        <div className="check-in">
          <p>Check in</p>
          <DatePicker
            value={localCheckInDate}
            onChange={(newValue) => setLocalCheckInDate(newValue)}
            renderInput={(params) => (
              <input {...params} placeholder="Select check-in date" />
            )}
          />
        </div>

        <div className="check-out">
          <p>Check out</p>
          <DatePicker
            value={localCheckOutDate}
            onChange={(newValue) => setLocalCheckOutDate(newValue)}
            renderInput={(params) => (
              <input {...params} placeholder="Select check-out date" />
            )}
          />
        </div>

        <div className="guests">
          <p>Guests</p>
          <input type="text" placeholder="Add guests" />
          <span onClick={handleSearch} style={{ cursor: "pointer" }}>
            <IoSearch />
          </span>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default SearchbarHtml;
