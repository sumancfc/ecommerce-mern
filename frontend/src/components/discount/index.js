import React from "react";

const DiscountCoupon = ({
  couponName,
  setCouponName,
  applyCoupon,
  error,
  setError,
}) => {
  return (
    <div className='discount__code-wrapper mt-40'>
      <div className='title__wrap'>
        <h4 className='cart__bottom-title section__bg-gray'>Use Coupon Code</h4>
      </div>
      <div className='discount__code'>
        <p>Enter your coupon code if you have one.</p>
        <form>
          {error && <p className='text-danger'>{error}</p>}
          <input
            type='text'
            name='name'
            value={couponName}
            required
            onChange={(e) => {
              setCouponName(e.target.value);
              setError();
            }}
          />
          <button className='cart__btn' type='submit' onClick={applyCoupon}>
            Apply Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiscountCoupon;
