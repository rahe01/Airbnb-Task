import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { TbShare2 } from "react-icons/tb"; // Import TbShare2 icon

const CustomCarousel = ({
  images = [],
  autoplay = false,
  autoplayDelay = 5000,
  loop = false,
  prevArrow,
  nextArrow,
  className = '',
  showArrows = false, // Control visibility of arrows
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplayRef = useRef(null);

  // Handle next slide with smooth transition
  const nextSlide = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (loop) {
      setCurrentIndex(0);
    }
  };

  // Handle previous slide with smooth transition
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (loop) {
      setCurrentIndex(images.length - 1);
    }
  };

  // Autoplay logic
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(nextSlide, autoplayDelay);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [currentIndex, autoplay, autoplayDelay]);

  const handleShare = () => {
    const shareData = {
      title: 'Check out this image!',
      url: images[currentIndex], // Share the current image URL
    };

    // Use the Web Share API if supported
    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Share successful!'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Sharing not supported on this browser.');
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Image rendering */}
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="h-full w-full object-cover rounded-xl transition-transform duration-700 ease-in-out" // Smooth image transition
        />
      </div>

      {/* Previous Arrow */}
      {showArrows && currentIndex > 0 && ( // Show only if not the first slide
        <div
          className="absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointer z-10"
          onClick={prevSlide}
        >
          {prevArrow || (
            <button className="bg-white text-black p-2 border-none rounded-full shadow-xs transition-all duration-700 hover:bg-gray-400">
              <IoIosArrowBack />
            </button>
          )}
        </div>
      )}

      {/* Next Arrow */}
      {showArrows && currentIndex < images.length - 1 && ( // Show only if not the last slide
        <div
          className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer z-10"
          onClick={nextSlide}
        >
          {nextArrow || (
            <button className="bg-white text-black p-2 border-none rounded-full shadow-xs transition-all duration-700 hover:bg-gray-400">
              <IoIosArrowForward />
            </button>
          )}
        </div>
      )}

      {/* Share Button */}
      <div
        className="absolute top-2 right-2 cursor-pointer z-10 bg-white p-2 rounded-full shadow-xs transition-all duration-300 hover:shadow-lg"
        onClick={handleShare}
      >
        <TbShare2 className="text-black" /> {/* Updated share icon */}
      </div>

      {/* Dots for indication */}
      <div className="absolute bottom-2 w-full flex justify-center gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'} cursor-pointer`}
          />
        ))}
      </div>
    </div>
  );
};

CustomCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  autoplay: PropTypes.bool,
  autoplayDelay: PropTypes.number,
  loop: PropTypes.bool,
  prevArrow: PropTypes.node,
  nextArrow: PropTypes.node,
  className: PropTypes.string,
  showArrows: PropTypes.bool, // Prop to show arrows on hover
};

export default CustomCarousel;
