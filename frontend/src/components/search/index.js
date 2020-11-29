import React from "react";

const Search = ({ className = "", setKeyword, keyword }) => {
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
            {/* <button>
              <i className='fa fa-search'></i>
            </button> */}
          </div>
        </>
      </div>
    </div>
  );
};

export default Search;
