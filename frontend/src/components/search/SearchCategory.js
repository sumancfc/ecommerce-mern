import React from "react";

const SearchCategory = ({ className = "", setKeyword, keyword }) => {
  const handleSearch = (e) => {
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <div className={`${className}`}>
      <div className='search__wrap'>
        <>
          <div className='search__form'>
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
