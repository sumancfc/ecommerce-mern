import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { showAverage } from "../../../helpers/averageRating";
import { getProductCartQuantity } from "../../../helpers/product";

const ProductInfo = ({
  user,
  product,
  addToCart,
  handleWishlist,
  handleCompare,
  cartItems,
  wishlistItem,
  compareItem,
}) => {
  const { _id, title, price, quantity, category, subs, reviews } = product;

  const { addToast } = useToasts();

  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQuantity = getProductCartQuantity(cartItems, product);

  return (
    <div className='col-lg-6 col-md-6'>
      <div className='product__details-content product__details-content-modify'>
        <h2>{title}</h2>

        {reviews && reviews.length > 0 ? (
          showAverage(product)
        ) : (
          <h2>No review Yet</h2>
        )}

        <div className='pro__details-price-wrap mt-40'>
          <div className='product__price'>
            <span>Price: ${price}</span>
          </div>
        </div>

        <div className='pro__details-quality'>
          <div className='cart__plus-minus'>
            <button
              onClick={() =>
                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
              }
              className='dec qtybutton'
            >
              -
            </button>
            <input
              className='cart__plus-minus-box'
              type='text'
              value={quantityCount}
              readOnly
            />
            <button
              onClick={() =>
                setQuantityCount(
                  quantityCount < quantity - productCartQuantity
                    ? quantityCount + 1
                    : quantityCount
                )
              }
              className='inc qtybutton'
            >
              +
            </button>
          </div>
        </div>

        <div className='pro__details-compare-wishlist'>
          <div className='pro__details-compare'>
            <button
              className={compareItem !== undefined ? "active" : ""}
              disabled={compareItem !== undefined}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={() => handleCompare(_id, addToast, user.token)}
            >
              <i className='fa fa-retweet'></i>
            </button>
          </div>
          <div className='pro__details-wishlist'>
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
          </div>
        </div>

        <div className='pro__details-buy-now btn-hover'>
          {quantity && quantity > 0 ? (
            <button onClick={() => addToCart(product, addToast, quantityCount)}>
              Add To Cart
            </button>
          ) : (
            <button disabled className='active'>
              Out of stock
            </button>
          )}
          {/* <button
            onClick={() => addToCart(product, addToast, quantityCount)}
            disabled={productCartQuantity >= quantity}
          >
            Add To Cart
          </button> */}
        </div>

        {category && (
          <div className='pro__details-meta '>
            <span>Category :</span>
            <ul>
              <li>
                <Link to={`/category/${category.slug}`}>{category.name}</Link>
              </li>
            </ul>
          </div>
        )}

        {subs && (
          <div className='pro__details-meta'>
            <span>Sub Category :</span>
            <ul>
              {subs.map((single, key) => {
                return (
                  <li key={key}>
                    <Link to={`/subcategory/${single.slug}`}>
                      {single.slug}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
