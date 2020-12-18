import React from "react";

const OrderPlace = ({
  products,
  totalPrice,
  discountPrice,
  priceAfterDiscount,
  addressSaved,
  handleOrder,
  handleCashOnDelivery,
  handleStripe,
  COD,
  createCashOnDelivery,
}) => {
  return (
    <div className='order__area bg-gray'>
      <h3>Your order</h3>
      <div className='order__wrap'>
        <div className='order__info-wrap'>
          <div className='order__info'>
            <ul>
              <li>
                Product <span>Total</span>
              </li>
            </ul>
          </div>
          <div className='order__info-center'>
            <ul>
              {products.map((prod, i) => (
                <li key={i}>
                  {prod.product.title} X {prod.count}{" "}
                  <span>${prod.product.price * prod.count} </span>
                </li>
              ))}
            </ul>
          </div>
          <div className='order__info order__subtotal'>
            <ul>
              <li>
                Cart Total <span>${totalPrice} </span>
              </li>
            </ul>
          </div>

          <div className='order__info order__total'>
            {discountPrice > 0 && (
              <ul>
                <li>
                  Discount Price <span> - ${discountPrice} </span>
                </li>
              </ul>
            )}
          </div>

          <div className='order__info order__total'>
            {priceAfterDiscount > 0 && (
              <ul>
                <li>
                  Total Payable <span>${priceAfterDiscount}</span>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className='payment__method'>
          <div className='payment__top payment__single'>
            <input
              className='input-radio'
              type='radio'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              defaultChecked
              onChange={handleStripe}
            />
            <label className='form-check-label' htmlFor='Stripe'>
              Stripe Payment
            </label>
          </div>
          <div className='payment__top payment__single'>
            <input
              className='input-radio'
              type='radio'
              label='Cash on Delivery'
              id='COD'
              name='paymentMethod'
              value='Cash on Delivery'
              onChange={handleCashOnDelivery}
            />
            <label className='form-check-label' htmlFor='COD'>
              Cash On Delivery
            </label>
          </div>
        </div>
      </div>
      <div className='Place__order mt-40'>
        {COD === true && (
          <button
            className='cart__btn'
            disabled={!addressSaved || !products.length}
            onClick={createCashOnDelivery}
          >
            Place Order
          </button>
        )}
        {COD === false && (
          <button
            className='cart__btn'
            disabled={!addressSaved || !products.length}
            onClick={handleOrder}
          >
            Place Order
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderPlace;
