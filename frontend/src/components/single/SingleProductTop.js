import React from "react";
import ProductImageSlider from "./sub/ProductImageSlider";
import ProductInfo from "./sub/ProductInfo";

const SingleProductTop = ({
  product,
  user,
  addToCart,
  handleWishlist,
  cartItems,
  wishlistItem,
}) => {
  return (
    <div className='product__details-area pt-90 pb-90'>
      <div className='container'>
        <div className='row'>
          <ProductImageSlider product={product} />

          <ProductInfo
            product={product}
            user={user}
            addToCart={addToCart}
            handleWishlist={handleWishlist}
            cartItems={cartItems}
            wishlistItem={wishlistItem}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleProductTop;
