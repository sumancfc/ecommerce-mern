import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { saveShippingAddress } from "../../helpers/cart";

const ShippingAddress = ({ user }) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const { addToast } = useToasts();

  const handleShippingAddress = (e) => {
    e.preventDefault();

    saveShippingAddress({ address, city, postalCode, country }, user.token)
      .then((res) => {
        addToast("Address added", { appearance: "success", autoDismiss: true });
        setAddress("");
        setCountry("");
        setPostalCode("");
        setCity("");
      })
      .catch((err) => console.log(err));
  };

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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className='tax__select'>
            <input
              type='text'
              placeholder='Enter City'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className='tax__select'>
            <input
              type='text'
              placeholder='Enter Postal Code'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <div className='tax__select'>
            <input
              type='text'
              placeholder='Enter Country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
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
