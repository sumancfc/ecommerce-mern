import React from "react";

const SearchCategory = ({ className = "", setKeyword, keyword }) => {
  const handleSearch = (e) => {
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <div className={`${className}`}>
      <div className='header__search'>
        <>
          <div className='header__search-form'>
            <input
              className='input-text'
              value={keyword}
              placeholder='Search'
              type='search'
              onChange={handleSearch}
            />
          </div>
        </>
      </div>
    </div>
  );
};

export default SearchCategory;
