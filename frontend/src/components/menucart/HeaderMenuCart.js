import React from "react";
import { Link } from "react-router-dom";

const HeaderMenuCart = ({ cartItems, handleDelete }) => {
  const closeCart = () => {
    const clsCart = document.querySelector(".shopping__cart-content");
    clsCart.classList.remove("show");
  };

  return (
    <div className='shopping__cart-content'>
      {cartItems && cartItems.length >= 1 ? (
        <>
          <div className='shopping__cart-title'>
            <h4>Your Cart</h4>
            <Link className='shopping__cart-close' to='#' onClick={closeCart}>
              <i className='fa fa-close'></i>
            </Link>
          </div>
          <ul>
            {cartItems.map((cartItem, i) => {
              const { images, slug, title, price, qty } = cartItem;
              return (
                <li key={i} className='shopping__cart-single'>
                  <div className='shopping__cart-img'>
                    <Link to={`/product/${slug}`}>
                      <img
                        src={images && images.length ? images[0].url : ""}
                        alt={slug}
                        className='img-fluid'
                      />
                    </Link>
                  </div>
                  <div className='shopping__cart-s-title'>
                    <h4>
                      <Link to={`/product/${slug}`}>{title}</Link>
                    </h4>
                    <span>Price:${price}</span>
                    <br />
                    <span>Qty: {qty}</span>
                  </div>
                  <div className='shopping__cart-s-delete'>
                    <button onClick={() => handleDelete(cartItem)}>
                      <i className='fa fa-trash'></i>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className='shopping__cart-bottom'>
            <div className='shopping__cart-btn btn-hover default-btn text-center'>
              <Link className='default-btn' to='/cart'>
                View Cart
              </Link>
            </div>
          </div>
        </>
      ) : (
        <p className='text-center'>No items added to cart</p>
      )}
    </div>
  );
};

export default HeaderMenuCart;
