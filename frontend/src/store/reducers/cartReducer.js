import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART,
} from "../constants/index";

const initialState = [];

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const cartItems = state,
        product = action.payload;

      const cartItem = cartItems.filter((item) => item.id === product._id)[0];
      if (cartItem === undefined) {
        return [
          ...cartItems,
          {
            ...product,
            //      quantity: product.quantity ? product.quantity : 1,
            cartItemId: product._id,
          },
        ];
      } else {
        return cartItems.map((item) =>
          item.cartItemId === cartItem.cartItemId
            ? {
                ...item,
                //   quantity: product.quantity
                //     ? item.quantity + product.quantity
                //     : item.quantity + 1,
              }
            : item
        );
      }

    default:
      return state;
  }
};
