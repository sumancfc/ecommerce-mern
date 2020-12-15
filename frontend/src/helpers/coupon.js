import axios from "axios";

//create coupon
export const createCoupon = async (coupon, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    { coupon },
    {
      headers: { authtoken },
    }
  );
};

//get all coupons
export const getCoupons = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/coupons`, {
    headers: { authtoken },
  });
};

//delete coupon
export const deleteCoupon = async (couponId, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
    headers: { authtoken },
  });
};

//discount coupon applied
export const applyDiscountCoupon = async (couponName, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    {
      couponName,
    },
    {
      headers: { authtoken },
    }
  );
};
