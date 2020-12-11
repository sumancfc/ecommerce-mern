import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { SEARCH_QUERY } from "../../store/constants";

const Search = ({ className = "" }) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const search = useSelector((state) => state.search);
  const { text } = search;

  const handleSearch = (e) => {
    dispatch({
      type: SEARCH_QUERY,
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <div className={`${className}`}>
      <div className='header__search'>
        <>
          <form className='header__search-form' onSubmit={handleSubmit}>
            <input
              className='input-text'
              value={text}
              placeholder='Search'
              type='search'
              onChange={handleSearch}
            />
            <button onSubmit={handleSubmit}>
              <i className='fa fa-search'></i>
            </button>
          </form>
        </>
      </div>
    </div>
  );
};

export default Search;
