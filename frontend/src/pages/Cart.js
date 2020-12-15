import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import Layout from "../Layout";
import Breadcrumb from "../components/breadcrumb";
import {
  addToCart,
  decreaseQuantity,
  deleteAllFromCart,
  deleteFromCart,
  productAvailable,
} from "../store/actions/cartAction";
import { addUserCart } from "../helpers/cart";

const Cart = ({
  user,
  cartItems,
  decreaseQuantity,
  addToCart,
  deleteFromCart,
  deleteAllFromCart,
  history,
}) => {
  const [quantityCount] = useState(1);

  const { addToast } = useToasts();
  let cartTotalPrice = 0;

  const proccedTochekcout = () => {
    addUserCart(cartItems, user.token)
      .then((res) => {
        console.log(res);
        if (res.data.ok) {
          history.push("/checkout");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <Breadcrumb pageTitle='Cart' />

      <div className='cart__main-area pt-85 pb-90'>
        <div className='container'>
          {cartItems && cartItems.length >= 1 ? (
            <>
              <h3 className='cart__page-title'>Your cart items</h3>
              <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                  <div className='table-content table-responsive cart__table-content'>
                    <table>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Product Name</th>
                          <th>Until Price</th>
                          <th>Qty</th>
                          <th>Subtotal</th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((cartItem, i) => {
                          const {
                            images,
                            slug,
                            title,
                            price,
                            qty,
                            _id,
                          } = cartItem;

                          console.log(_id);

                          cartTotalPrice += price * qty;

                          return (
                            <tr key={i}>
                              <td className='product__thumbnail'>
                                <Link to={`/product/${slug}`}>
                                  <img
                                    src={
                                      images && images.length
                                        ? images[0].url
                                        : ""
                                    }
                                    alt={slug}
                                    className='img-fluid'
                                  />
                                </Link>
                              </td>
                              <td className='product__name'>
                                <Link to={`/product/${slug}`}>{title}</Link>
                              </td>
                              <td className='product__price-cart'>
                                <span className='amount'>${price}</span>
                              </td>

                              <td className='product__quantity'>
                                <div className='cart__plus-minus'>
                                  <button
                                    className='dec qtybutton'
                                    onClick={() =>
                                      decreaseQuantity(cartItem, addToast)
                                    }
                                  >
                                    -
                                  </button>
                                  <input
                                    className='cart__plus-minus-box'
                                    type='text'
                                    value={cartItem.qty}
                                    readOnly
                                  />
                                  <button
                                    className='inc qtybutton'
                                    onClick={() =>
                                      addToCart(
                                        cartItem,
                                        addToast,
                                        quantityCount
                                      )
                                    }
                                    disabled={
                                      cartItem !== undefined &&
                                      qty &&
                                      qty >= productAvailable(cartItem)
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className='product__subtotal'>
                                $ {Number(price * qty).toFixed(2)}
                              </td>

                              <td className='product__remove'>
                                <Link
                                  to='#'
                                  onClick={() =>
                                    deleteFromCart(cartItem, addToast)
                                  }
                                >
                                  <i className='fa fa-trash'></i>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-12'>
                  <div className='cart__shiping-update-wrapper'>
                    <div className='cart__shiping-update'>
                      <Link to='/shop'>Continue Shopping</Link>
                    </div>
                    <div className='cart__clear'>
                      <button onClick={() => deleteAllFromCart(addToast)}>
                        Clear Shopping Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-4 col-md-12 '></div>
                <div className='col-lg-4 col-md-12 '></div>
                <div className='col-lg-4 col-md-12 '>
                  <div className='grand__totall'>
                    <div className='title__wrap'>
                      <h4 className='cart__bottom-title section__bg-gary-cart'>
                        Cart Total
                      </h4>
                    </div>

                    <h4 className='grand__totall-title'>
                      Grand Total <span> ${cartTotalPrice.toFixed(2)}</span>
                    </h4>
                    <button className='cart__btn' onClick={proccedTochekcout}>
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className='row'>
              <div className='col-lg-12'>
                <div className='empty__area text-center'>
                  <div className='empty__area-icon mb-30'>
                    <i className='fa fa-shopping-cart'></i>
                  </div>
                  <div className='empty__area-text'>
                    <h3> No items found in cart </h3>
                    <div className='default-btn btn-hover mt-30'>
                      <Link
                        to={process.env.PUBLIC_URL + "/shop"}
                        className='btn-style-outline btn-size-md '
                      >
                        Add Items
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userList,
    cartItems: state.cartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    decreaseQuantity: (item, addToast) => {
      dispatch(decreaseQuantity(item, addToast));
    },
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: (addToast) => {
      dispatch(deleteAllFromCart(addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
