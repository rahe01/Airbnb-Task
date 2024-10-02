import './serch.css';
import { IoSearch } from "react-icons/io5";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Import the adapter

const SearchbarHtml = () => {
    const [checkInDate, setCheckInDate] = useState(null); // Start with no default date
    const [checkOutDate, setCheckOutDate] = useState(null);

    // Function to handle the search action
    const handleSearch = () => {
        console.log('Check-in Date:', checkInDate ? checkInDate.format('DD/MM/YYYY') : 'Not selected');
        console.log('Check-out Date:', checkOutDate ? checkOutDate.format('DD/MM/YYYY') : 'Not selected');
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}> {/* Wrap here */}
            <div className="bar">
                <div className="location">
                    <p>Location</p>
                    <input type="text" placeholder="Where are you going?" />
                </div>

                <div className="check-in">
                    <p>Check in</p>
                    <DatePicker
                        value={checkInDate}
                        onChange={(newValue) => setCheckInDate(newValue)}
                        renderInput={(params) => <input {...params} placeholder="Select check-in date" />}
                    />
                </div>

                <div className="check-out">
                    <p>Check out</p>
                    <DatePicker
                        value={checkOutDate}
                        onChange={(newValue) => setCheckOutDate(newValue)}
                        renderInput={(params) => <input {...params} placeholder="Select check-out date" />}
                    />
                </div>

                <div className="guests">
                    <p>Guests</p>
                    <input type="text" placeholder="Add guests" />
                    <span onClick={handleSearch} style={{ cursor: 'pointer' }}><IoSearch /></span>
                </div>
            </div>
        </LocalizationProvider>
    );
};

export default SearchbarHtml;
