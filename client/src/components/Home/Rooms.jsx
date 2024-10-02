import Card from './Card';
import Container from '../Shared/Container';
import Heading from '../Shared/Heading';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import { useState } from 'react';
import SearchbarHtml from '../Shared/Navbar/SearchbarHtml';

const Rooms = () => {
  const axiosCommon = useAxiosCommon();
  const [params] = useSearchParams();
  const category = params.get('category');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [filteredRooms, setFilteredRooms] = useState([]);

  // Fetch all rooms initially
  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ['rooms', category],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/rooms?category=${category}`);
      return data; // Return all rooms based on category
    },
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  // Function to filter rooms based on date range
  const handleSearch = (checkIn, checkOut) => {
    setCheckInDate(checkIn);
    setCheckOutDate(checkOut);
    
    // Filter rooms based on the provided dates
    const filtered = rooms.filter(room => {
      const roomStartDate = new Date(room.dateRange.from);
      const roomEndDate = new Date(room.dateRange.to);
      return roomStartDate <= checkOut && roomEndDate >= checkIn;
    });
    setFilteredRooms(filtered);
  };

  if (isLoading) return <LoadingSpinner />;

  // Use all rooms initially if no filtering has been done
  const displayedRooms = filteredRooms.length > 0 ? filteredRooms : rooms;

  return (
    <Container>
<div className='relative'>
  <div className='absolute top-0 left-0 right-0 z-50 flex justify-center items-center'>
    <SearchbarHtml 
      setCheckInDate={setCheckInDate} 
      setCheckOutDate={setCheckOutDate} 
      fetchRooms={handleSearch} 
    />
  </div>
  {/* Other page content */}
</div>


      {displayedRooms.length > 0 ? (
        <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {displayedRooms.map(room => (
            <Card key={room._id} room={room} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center min-h-[calc(100vh-300px)]'>
          <Heading
            center={true}
            title='No Rooms Available In This Category Or Date!'
            subtitle='Please Select Other Categories or Date.'
          />
        </div>
      )}
    </Container>
  );
};

export default Rooms;
