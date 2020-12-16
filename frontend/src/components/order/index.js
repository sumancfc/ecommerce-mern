import React from "react";

const OrderPlace = ({
  products,
  totalPrice,
  discountPrice,
  priceAfterDiscount,
  addressSaved,
  handleOrder,
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
              id='payment_method'
              className='input-radio'
              type='radio'
              value='cheque'
              checked='checked'
              name='payment method'
            />
            <label htmlFor='payment_method'>Direct Bank Transfer</label>
            <div className='payment__box payment_method_bacs'>
              <p>
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference.
              </p>
            </div>
          </div>
          <div className='payment__top payment__single'>
            <input
              id='payment__method'
              className='input-radio'
              type='radio'
              value='cheque'
              name='payment method'
            />
            <label htmlFor='payment__method'>Check payments</label>
            <div className='payment__box payment_method_bacs'>
              <p>
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference.
              </p>
            </div>
          </div>
          <div className='payment__top payment__single'>
            <input
              id='payment__method-3'
              className='input-radio'
              type='radio'
              value='cheque'
              name='payment method'
            />
            <label htmlFor='payment__method-3'>Cash on delivery</label>
            <div className='payment__box payment_method_bacs'>
              <p>
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference.
              </p>
            </div>
          </div>
          <div className='payment__top payment__single payment__single-3'>
            <input
              id='payment__method-4'
              className='input-radio'
              type='radio'
              value='cheque'
              name='payment method'
            />
            <label htmlFor='payment__method-4'>PayPal</label>
            <div className='payment__box payment_method_bacs'>
              <p>
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='Place__order mt-40'>
        <button
          className='cart__btn'
          disabled={!addressSaved || !products.length}
          onClick={handleOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderPlace;
