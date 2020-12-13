import axios from "axios";
import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART,
} from "../constants/index";

// export const addUserCart = async (cart, authtoken) => {
//   return axios.post(
//     `${process.env_REACT_APP_API}/user/cart`,
//     { cart },
//     {
//       headers: {
//         authtoken,
//       },
//     }
//   );
// };

// export const getUserCart = async (authtoken) => {
//   return axios.get(`${process.env_REACT_APP_API}/user/cart`, {
//     headers: {
//       authtoken,
//     },
//   });
// };

// export const removeUserCart = async (authtoken) => {
//   return axios.delete(`${process.env_REACT_APP_API}/user/cart`, {
//     headers: {
//       authtoken,
//     },
//   });
// };

//add to cart
export const addToCart = (item, addToast, quantityCount) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Added To Cart", { appearance: "success", autoDismiss: true });
    }
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...item,
        quantity: quantityCount,
      },
    });
  };
};

// export const addToCart = async (cart, authtoken) => {
//   return axios.post(
//     `${process.env_REACT_APP_API}/user/cart`,
//     { cart },
//     {
//       headers: {
//         authtoken,
//       },
//     }
//   );
// };
