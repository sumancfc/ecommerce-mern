import React from "react";

const MenuCart = () => {
  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("show");
  };

  return (
    <div className='header__cart header__cart-white'>
      <button className='header__cart-active' onClick={(e) => handleClick(e)}>
        <i className='fa fa-shopping-cart'></i> <br />
        <span className='cart__items-count'>1</span>
      </button>
    </div>
  );
};

export default MenuCart;
