import React from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import laptop from "../../../assets/images/product-8.jpg";

const ShopProductItem = ({
  product,
  user,
  addToCart,
  handleWishlist,
  cartItem,
  wishlistItem,
}) => {
  const {
    _id,
    title,
    slug,
    images,
    price,
    category,
    description,
    quantity,
  } = product;
  const { addToast } = useToasts();

  return (
    <>
      <div className='col-xl-4 col-lg-6 col-md-6 col-sm-6 display__list'>
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
                onClick={() => handleWishlist(_id, addToast, user.token)}
              >
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
                      cartItem !== undefined && quantity > 0 ? "active" : ""
                    }
                    disabled={cartItem !== undefined && quantity > 0}
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

        <div className='shop__list-wrap mb-30'>
          <div className='row'>
            <div className='col-xl-4 col-lg-5 col-md-6 col-sm-6'>
              <div className='product__list-img'>
                <Link to={`/product/${slug}`}>
                  <img
                    src={images && images.length ? images[0].url : laptop}
                    alt={slug}
                    className='img-fluid'
                  />
                </Link>
                <div className='product__list-quickview'>
                  <button title='Quick View'>
                    <i className='fa fa-plus'></i>
                  </button>
                </div>
              </div>
            </div>
            <div className='col-xl-8 col-lg-7 col-md-6 col-sm-6'>
              <div className='shop__list-content'>
                <span>{category.name}</span>

                <h4>
                  <Link to={`/product/${slug}`}>{title}</Link>
                </h4>
                <div className='pro__list-price'>
                  <span>${price} </span>
                </div>
                <p>{description}</p>
                <div className='product__list-action'>
                  <button
                    className={wishlistItem !== undefined ? "active" : ""}
                    disabled={wishlistItem !== undefined}
                    title={
                      wishlistItem !== undefined
                        ? "Added to wishlist"
                        : "Add to wishlist"
                    }
                    onClick={() => handleWishlist(_id, addToast, user.token)}
                  >
                    <i className='fa fa-heart-o'></i>
                  </button>
                  <button title='Add To Compare'>
                    <i className='fa fa-retweet'></i>
                  </button>
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
      </div>
    </>
  );
};

export default ShopProductItem;
