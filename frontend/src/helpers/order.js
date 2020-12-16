import axios from "axios";

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
