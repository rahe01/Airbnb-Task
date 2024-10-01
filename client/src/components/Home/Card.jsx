import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CustomCarousel from "./CustomCarousel"; // Import the CustomCarousel component
import { format } from "date-fns";
import { AiFillStar } from "react-icons/ai"; // Import the review icon

const Card = ({
  room,
  prevArrow,
  nextArrow,
  autoplay = false,
  autoplayDelay = 5000,
  loop = false,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Function to format the date range
  const formatDateRange = (fromDate, toDate) => {
    if (!fromDate || !toDate) return "Invalid Date";

    const start = new Date(fromDate);
    const end = new Date(toDate);

    // Check if the dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return "Invalid Date";

    // Format the dates using date-fns
    return `${format(start, "MMM dd")} - ${format(end, "MMM dd")}`;
  };

  return (
    <Link
      to={``}
      className={`col-span-1 cursor-pointer group ${className}`}
      onMouseEnter={() => setIsHovered(true)} // Show on hover
      onMouseLeave={() => setIsHovered(false)} // Hide on leave
    >
      <div className="flex flex-col w-full">
        {/* Carousel Section for Images */}
        <div className="relative">
          <CustomCarousel
            images={room?.images || []}
            autoplay={autoplay}
            autoplayDelay={autoplayDelay}
            loop={loop}
            prevArrow={prevArrow}
            nextArrow={nextArrow}
            showArrows={isHovered} // Show arrows only when hovered
            className="rounded-xl"
          />
        </div>

        {/* Room Details */}
        <div className="font-semibold text-base flex items-center justify-between">
          <span>{room?.location}</span>
          <span className="flex items-center text-sm">
            <AiFillStar />
            <span className="ml-1 ">4.0</span>{" "}
            {/* Show reviews count or a placeholder */}
          </span>
        </div>
        <div>
          <h1 className="text-sm">Stay With : Rahe Hosting for 12 years</h1>
        </div>
        <div className="text-sm">
          {formatDateRange(room?.dateRange?.from, room?.dateRange?.to)}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            ${room?.priceWithTaxShow ? room?.priceWithTax : room?.price}
          </div>
          <div className={`font-light ${room?.priceWithTaxShow ? "underline" : ""}`}>
  {room?.priceWithTaxShow ? "with tax" : "night"}
</div>

        </div>
      </div>
    </Link>
  );
};

Card.propTypes = {
  room: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired, // Expecting an array of image URLs
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    priceWithTax: PropTypes.number, // Add priceWithTax as a prop
    priceWithTaxShow: PropTypes.bool, // Add priceWithTaxShow as a prop
    Booked: PropTypes.bool,
    dateRange: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
    }),
    reviews: PropTypes.number, // Number of reviews (optional)
  }).isRequired,
  prevArrow: PropTypes.node, // Accept custom Prev Arrow component
  nextArrow: PropTypes.node, // Accept custom Next Arrow component
  autoplay: PropTypes.bool, // Autoplay mode
  autoplayDelay: PropTypes.number, // Interval for autoplay
  transition: PropTypes.object, // Transition settings
  loop: PropTypes.bool, // Looping mode
  className: PropTypes.string, // Custom className
};

export default Card;
