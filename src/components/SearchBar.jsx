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
    <div>
      <h1>Weather Update</h1>
      <div>
        <input 
        ref={inputRef}
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Enter Location'
        type='text'
        className='outline:none' />
        <img 
          src={search}
          alt="Search"
          className=' size-10 ml-2'
          onClick={handleIconClick} />
      </div>
    </div>
  )
}

export default SearchBar