import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { deleteFromCart } from "../../store/actions/cartAction";
import HeaderMenuCart from "./HeaderMenuCart";

const MenuCart = () => {
  const cartItems = useSelector((state) => state.cartData);

  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("show");
  };

  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const handleDelete = (item) => {
    dispatch(deleteFromCart(item, addToast));
  };

  return (
    <div className='header__cart header__cart-white'>
      <button className='header__cart-active' onClick={(e) => handleClick(e)}>
        <i className='fa fa-shopping-cart'></i> <br />
        <span className='cart__items-count'>{cartItems.length}</span>
      </button>
      <HeaderMenuCart cartItems={cartItems} handleDelete={handleDelete} />
    </div>
  );
};

export default MenuCart;
