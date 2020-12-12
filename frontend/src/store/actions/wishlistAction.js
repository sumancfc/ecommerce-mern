import axios from "axios";
import {
  ADD_TO_WISHLIST,
  DELETE_ALL_FROM_WISHLIST,
  DELETE_FROM_WISHLIST,
  FETCH_WISHLIST_SUCCESS,
} from "../constants/wishlist";

export const addToWishlist = (productId, addToast, authtoken) => async (
  dispatch
) => {
  if (addToast) {
    addToast("Added To Wishlist", {
      appearance: "success",
      autoDismiss: true,
    });
  }

  const config = {
    headers: { authtoken },
  };

  const { data } = await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    config
  );

  dispatch({ type: ADD_TO_WISHLIST, payload: data.wishlist });
};

export const getAllWishlist = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
    headers: { authtoken },
  });
};

export const deleteFromWishlist = async (productId, authtoken) => {
  return axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: { authtoken },
    }
  );
};
