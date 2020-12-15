import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../Layout";
import Breadcrumb from "../components/breadcrumb";
import { getUserCarts } from "../helpers/cart";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  console.log(products);
  console.log(totalPrice);

  const user = useSelector((state) => state.userList);

  useEffect(() => {
    getUserCarts(user.token).then((res) => {
      setProducts(res.data.products);
      setTotalPrice(res.data.cartTotal);
    });
  }, [user]);

  return (
    <Layout>
      <Breadcrumb pageTitle='Checkout' />

      <div className='checkout__area pt-90 pb-90'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 col-md-6'>
              <div className='cart__tax'>
                <div className='title__wrap'>
                  <h4 className='cart__bottom-title section__bg-gray'>
                    Estimate Shipping And Tax
                  </h4>
                </div>
                <div className='tax__wrapper'>
                  <p>Enter your destination to get a shipping estimate.</p>
                  <div className='tax__select-wrapper'>
                    <div className='tax__select'>
                      <label>* Country</label>
                      <select className='email s-email s-wid'>
                        <option>Nepal</option>
                        <option>India</option>
                        <option>Australia</option>
                        <option>UK</option>
                      </select>
                    </div>
                    <div className='tax__select'>
                      <label>* Region / State</label>
                      <select className='email s-email s-wid'>
                        <option>Nepal</option>
                        <option>India</option>
                        <option>Australia</option>
                        <option>UK</option>
                      </select>
                    </div>
                    <div className='tax__select'>
                      <label>* Zip/Postal Code</label>
                      <input type='text' />
                    </div>
                    <button className='cart__btn' type='submit'>
                      Get A Quote
                    </button>
                  </div>
                </div>
              </div>

              <div className='discount__code-wrapper mt-40'>
                <div className='title__wrap'>
                  <h4 className='cart__bottom-title section__bg-gray'>
                    Use Coupon Code
                  </h4>
                </div>
                <div className='discount__code'>
                  <p>Enter your coupon code if you have one.</p>
                  <form>
                    <input type='text' required='' name='name' />
                    <button className='cart__btn' type='submit'>
                      Apply Coupon
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className='col-lg-6 col-md-12'>
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
                          Subtotal <span>${totalPrice} </span>
                        </li>
                      </ul>
                    </div>
                    <div className='order__info order__shipping'>
                      <ul>
                        <li>
                          Shipping <p>Enter your full address </p>
                        </li>
                      </ul>
                    </div>
                    <div className='order__info order__total'>
                      <ul>
                        <li>
                          Total <span>$273.00 </span>
                        </li>
                      </ul>
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
                      <label htmlFor='payment_method'>
                        Direct Bank Transfer
                      </label>
                      <div className='payment__box payment_method_bacs'>
                        <p>
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
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
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
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
                      <label htmlFor='payment__method-3'>
                        Cash on delivery
                      </label>
                      <div className='payment__box payment_method_bacs'>
                        <p>
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
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
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='Place__order mt-40'>
                  <button className='cart__btn'>Place Order</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
