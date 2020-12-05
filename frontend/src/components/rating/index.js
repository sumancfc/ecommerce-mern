import React from "react";

const Ratings = ({ value, text }) => {
  return (
    <div className='product__rating-review'>
      <div className='product__rating'>
        <i
          className={
            value >= 1
              ? "fa fa-star"
              : value >= 0.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }
        ></i>
        <i
          className={
            value >= 2
              ? "fa fa-star"
              : value >= 1.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }
        ></i>
        <i
          className={
            value >= 3
              ? "fa fa-star"
              : value >= 2.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }
        ></i>
        <i
          className={
            value >= 4
              ? "fa fa-star"
              : value >= 3.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }
        ></i>
        <i
          className={
            value >= 5
              ? "fa fa-star"
              : value >= 4.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }
        ></i>
      </div>
      <div className='product__rating'>{text && text}</div>
    </div>
  );
};

export default Ratings;
