import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import laptop from "../../../assets/images/product-8.jpg";

const Product = ({ product }) => {
  const { title, slug, images, price, category } = product;

  return (
    <Fragment>
      <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6'>
        <div className='product__wrap mb-35'>
          <div className='product__img mb-15'>
            <Link to={`/product/${slug}`}>
              <img
                src={images && images.length ? images[0].url : laptop}
                alt={slug}
                className='img-fluid'
              />
            </Link>

            <div className='product__action'>
              <button title='Quick View'>
                <i className='fa fa-plus'></i>
              </button>
              <button title='Add To Wishlist'>
                <i className='fa fa-heart-o'></i>
              </button>
              <button title='Add To Compare'>
                <i className='fa fa-retweet'></i>
              </button>
            </div>
          </div>
          <div className='product__content'>
            <span>{category.name}</span>
            <h4>
              <Link to='/product'>{title}</Link>
            </h4>
            <div className='price__add-to-cart'>
              <div className='product__price'>
                <span>${price} </span>
              </div>
              <div className='product-add-to-cart'>
                <button title='Add To Cart'>
                  <i className='fa fa-shopping-cart'></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Product;
