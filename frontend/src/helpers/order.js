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

//get all orders by admin
export const getAllOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: {
      authtoken,
    },
  });

//get user's order details by admin
export const getOrderDetailsByAdmin = async (orderId, authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/admin/order/${orderId}`, {
    headers: {
      authtoken,
    },
  });

//update order status
export const updateOrderStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );
