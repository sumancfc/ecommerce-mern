import axios from "axios";

//create user order
export const createUserOrder = async (stripeResponse, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    {
      headers: {
        authtoken,
      },
    }
  );

//get user orders
export const getUserOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      authtoken,
    },
  });

//get order details
export const getOrderDetails = async (orderId, authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/order/${orderId}`, {
    headers: {
      authtoken,
    },
  });
