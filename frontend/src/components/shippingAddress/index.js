import React from "react";

const ShippingAddress = ({
  address,
  city,
  postalCode,
  country,
  handleShippingAddressChange,
  handleShippingAddress,
}) => {
  return (
    <div className='cart__tax'>
      <div className='title__wrap'>
        <h4 className='cart__bottom-title section__bg-gray'>
          Shipping Address
        </h4>
      </div>
      <div className='tax__wrapper'>
        <p>Enter your destination to get a shipping estimate.</p>
        <form
          className='tax__select-wrapper mt-20'
          onSubmit={handleShippingAddress}
        >
          <div className='tax__select'>
            <input
              type='text'
              placeholder='Enter Address'
              name='address'
              value={address}
              onChange={handleShippingAddressChange}
              required
            />
          </div>
          <div className='tax__select'>
            <input
              type='text'
              placeholder='Enter City'
              name='city'
              value={city}
              onChange={handleShippingAddressChange}
              required
            />
          </div>
          <div className='tax__select'>
            <input
              type='text'
              placeholder='Enter Postal Code'
              name='postalCode'
              value={postalCode}
              onChange={handleShippingAddressChange}
              required
            />
          </div>
          <div className='tax__select'>
            <input
              type='text'
              placeholder='Enter Country'
              name='country'
              value={country}
              onChange={handleShippingAddressChange}
              required
            />
          </div>
          <button className='cart__btn'>Submit Address</button>
        </form>
      </div>
    </div>
  );
};

export default ShippingAddress;
