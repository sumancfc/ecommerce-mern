import React from "react";
import { Link } from "react-router-dom";

const ListTable = ({ c, removeCategory, link }) => {
  return (
    <>
      <div className='d-flex justify-content-between align-items-center category__box bg-gray-1'>
        {c.name}
        <div className='category__icon'>
          <span className='' onClick={() => removeCategory(c.slug)}>
            <i className='fa fa-trash' />
          </span>
          <span>
            <Link to={`/admin/${link}/${c.slug}`}>
              <i className='fa fa-edit' />
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default ListTable;
