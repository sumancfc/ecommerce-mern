import React from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { showAverage } from "../../../helpers/averageRating";

const ProductInfo = ({ user, product, addToWishlist, wishlistItem }) => {
  const { title, price, quantity, category, subs, reviews } = product;
  const { addToast } = useToasts();

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

        <div className='pro__details-compare-wishlist'>
          <div className='pro__details-compare'>
            <button title='Add To Compare'>Compare</button>
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
              onClick={() => addToWishlist(product._id, addToast, user.token)}
            >
              <i className='fa fa-heart-o'></i>
            </button>
          </div>
        </div>
        <div className='pro__details-buy-now btn-hover'>
          {quantity && quantity > 0 ? (
            <button title='Add To Cart'>Add To Cart</button>
          ) : (
            <button disabled>Out of Stock</button>
          )}
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
