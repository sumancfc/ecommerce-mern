import {
  ADD_TO_CART,
  DELETE_ALL_FROM_CART,
  DELETE_FROM_CART,
  DECREASE_QUANTITY,
} from "../constants/index";

//add to cart
export const addToCart = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Added To Cart", { appearance: "success", autoDismiss: true });
    }

    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...item,
        // quantity: quantityCount,
      },
    });
  };
};
