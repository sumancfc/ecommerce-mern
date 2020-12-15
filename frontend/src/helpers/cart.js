import axios from "axios";

//save cart items to database
export const addUserCart = async (cartItems, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    {
      cartItems,
    },
    {
      headers: {
        authtoken,
      },
    }
  );
};

//get cart items from database
export const getUserCarts = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: { authtoken },
  });
};

//delete cart items from database
export const deleteUserCart = async (authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: { authtoken },
  });
};
