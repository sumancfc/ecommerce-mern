import axios from "axios";

export const addToWishlist = async (productId, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: { authtoken },
    }
  );
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
