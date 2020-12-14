import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART,
} from "../constants/index";

let initialState = [];

const cartReducer = (state = initialState, action) => {
  const cartItems = state,
    product = action.payload;

  if (action.type === ADD_TO_CART) {
    // for non variant products

    const cartItem = cartItems.filter((item) => item._id === product._id)[0];
    console.log(cartItem);

    if (cartItem === undefined) {
      return [
        ...cartItems,
        {
          ...product,

          qty: product.qty ? product.qty : 1,
          cartItemId: product._id,
        },
      ];
    } else {
      return cartItems.map((item) =>
        item.cartItemId === cartItem.cartItemId
          ? {
              ...item,
              qty: product.qty ? item.qty + product.qty : item.qty + 1,
            }
          : item
      );
    }
  }

  if (action.type === DECREASE_QUANTITY) {
    if (product.qty === 1) {
      const remainingItems = (cartItems, product) =>
        cartItems.filter(
          (cartItem) => cartItem.cartItemId !== product.cartItemId
        );
      return remainingItems(cartItems, product);
    } else {
      return cartItems.map((item) =>
        item.cartItemId === product.cartItemId
          ? { ...item, qty: item.qty - 1 }
          : item
      );
    }
  }

  if (action.type === DELETE_FROM_CART) {
    const remainingItems = (cartItems, product) =>
      cartItems.filter(
        (cartItem) => cartItem.cartItemId !== product.cartItemId
      );
    return remainingItems(cartItems, product);
  }

  if (action.type === DELETE_ALL_FROM_CART) {
    return cartItems.filter((item) => {
      return false;
    });
  }

  return state;
};

export default cartReducer;
