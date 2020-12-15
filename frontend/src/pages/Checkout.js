import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../Layout";
import Breadcrumb from "../components/breadcrumb";
import { getUserCarts } from "../helpers/cart";
import ShippingAddress from "../components/shippingAddress";
import DiscountCoupon from "../components/discount";
import { applyDiscountCoupon } from "../helpers/coupon";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponName, setCouponName] = useState("");
  const [discountPrice, setDiscountPrice] = useState(0);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
  const [error, setError] = useState("");

  const user = useSelector((state) => state.userList);

  useEffect(() => {
    getUserCarts(user.token).then((res) => {
      setProducts(res.data.products);
      setTotalPrice(res.data.cartTotal);
    });
  }, [user]);

  const applyCoupon = (e) => {
    e.preventDefault();
    // console.log("Coupon applied");
    applyDiscountCoupon(couponName, user.token)
      .then((res) => {
        if (res.data) {
          setPriceAfterDiscount(res.data.priceAfterDiscount);
          setDiscountPrice(res.data.discountPrice);
        }

        if (res.data.err) {
          setError(res.data.err);
        }
        setCouponName("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <Breadcrumb pageTitle='Checkout' />

      <div className='checkout__area pt-90 pb-90'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 col-md-6'>
              <ShippingAddress user={user} />
              <DiscountCoupon
                couponName={couponName}
                setCouponName={setCouponName}
                applyCoupon={applyCoupon}
                error={error}
                setError={setError}
              />
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
