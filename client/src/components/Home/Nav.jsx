
import { FaGlobe } from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';

const NavCompo = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-red-600">
          <a href="/">Airbnb</a>
        </div>

        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-full py-2 px-4 w-1/2">
          <input
            type="text"
            placeholder="Where are you going?"
            className="flex-grow outline-none px-2"
          />
          <button className="bg-red-600 text-white rounded-full p-2">
            <BiSearch />
          </button>
        </div>

        {/* Right Menu */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <FaGlobe className="text-2xl" />
          </div>
          <div className="flex items-center">
            <button className="bg-red-600 text-white px-4 py-2 rounded-full">
              Sign up
            </button>
            <button className="border border-gray-300 px-4 py-2 rounded-full">
              Log in
            </button>
          </div>
          <div className="hidden md:block">
            <button className="flex items-center p-2 border border-gray-300 rounded-full">
              <AiOutlineMenu />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavCompo;
