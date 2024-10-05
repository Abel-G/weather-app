import { useRef, useState } from 'react'
import search from '../assets/search.png'
function SearchBar({ onSearch }) {
  const inputRef = useRef(); 
  const [location, setLocation] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearch(location);
      setLocation(''); 
    }
  };

  const handleIconClick = () => {
    onSearch(location);
    setLocation(''); 
  };
  return (
    <div className='text-center p-10'>
      <h1 className='text-3xl font-bold text-center m-0 py-10'>Your Weather Update</h1>
      <div className="flex items-center justify-center">
          <div className="relative flex items-center">
            <img
              src={search}
              alt="Search"
              className="absolute left-3 w-5 h-5 brightness-0 invert cursor-pointer"
              onClick={handleIconClick}
            />
            <input
              ref={inputRef}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter Location"
              type="text"
              className="pl-10 pr-4 py-3 text-lg rounded-full border border-white/80 bg-white/20 text-white focus:outline-none focus:none placeholder-white"
            />
          </div>
        </div>
    </div>
  )
}

export default SearchBar