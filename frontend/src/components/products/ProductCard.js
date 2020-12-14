import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import laptop from "../../assets/images/product-8.jpg";

const ProductCard = ({
  user,
  product,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItem,
  wishlistItem,
  compareItem,
}) => {
  const { title, slug, images, price, category, quantity } = product;

  const { addToast } = useToasts();

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
              <button
                className={wishlistItem !== undefined ? "active" : ""}
                disabled={wishlistItem !== undefined}
                title={
                  wishlistItem !== undefined
                    ? "Added to wishlist"
                    : "Add to wishlist"
                }
                onClick={() => addToWishlist(product._id, addToast, user.token)}
              >
                <i className='fa fa-heart-o'></i>
              </button>
              <button
                className={compareItem !== undefined ? "active" : ""}
                disabled={compareItem !== undefined}
                title={
                  compareItem !== undefined
                    ? "Added to compare"
                    : "Add to compare"
                }
                onClick={() => addToCompare(product._id, addToast)}
              >
                <i className='fa fa-retweet'></i>
              </button>
            </div>
          </div>
          <div className='product__content'>
            <span>{category.name}</span>
            <h4>
              <Link to={`/product/${slug}`}>{title}</Link>
            </h4>
            <div className='price__add-to-cart'>
              <div className='product__price'>
                <span>${price} </span>
              </div>
              <div className='product-add-to-cart'>
                {quantity && quantity > 0 ? (
                  <button
                    onClick={() => addToCart(product, addToast)}
                    className={
                      cartItem !== undefined && cartItem.quantity > 0
                        ? "active"
                        : ""
                    }
                    disabled={cartItem !== undefined && cartItem.quantity > 0}
                    title={
                      cartItem !== undefined ? "Added to cart" : "Add to cart"
                    }
                  >
                    <i className='fa fa-shopping-cart'></i>
                  </button>
                ) : (
                  <button disabled className='active' title='Out of stock'>
                    <i className='fa fa-shopping-cart'></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductCard;
