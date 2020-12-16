import axios from "axios";

export const stripePayment = async (coupon, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-stripe-payment`,
    { couponApplied: coupon },
    {
      headers: { authtoken },
    }
  );
};
