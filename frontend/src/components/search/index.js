import React from "react";

const Search = ({ className = "" }) => {
  return (
    <div className={`${className}`}>
      <div className='header__search'>
        <form>
          <div className='header__search-form'>
            <input
              className='input-text'
              value=''
              placeholder='Search products...'
              type='search'
              onChange={(e) => e.target.value}
              required
            />
            <button>
              <i className='fa fa-search'></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
