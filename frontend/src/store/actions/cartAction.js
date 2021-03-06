import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART,
} from "../constants/index";

//add to cart
export const addToCart = (item, addToast, quantityCount) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Added To Cart", { appearance: "success", autoDismiss: true });
    }

    // console.log(item);
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...item,
        qty: quantityCount,
      },
    });
  };
};

//decrease from cart in redux state
export const decreaseQuantity = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Item decremented from cart", {
        appearance: "warning",
        autoDismiss: true,
      });
    }
    dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};

//delete from cart by id in redux state
export const deleteFromCart = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Removed from cart", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    dispatch({ type: DELETE_FROM_CART, payload: item });
  };
};

//delete all from cart in redux state
export const deleteAllFromCart = (addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Removed all from cart", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};

// get stock of cart item
export const productAvailable = (item) => {
  return item.quantity;
};
