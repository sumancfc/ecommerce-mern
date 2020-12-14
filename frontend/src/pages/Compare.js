import React from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";
import Layout from "../Layout";
import Breadcrumb from "../components/breadcrumb";
import Ratings from "../components/rating";
import { deleteFromCompare } from "../store/actions/compareAction";
import { addToCart } from "../store/actions/cartAction";

const Compare = ({ cartItems, compareItems, addToCart, deleteFromCompare }) => {
  const { addToast } = useToasts();

  console.log(compareItems);

  return (
    <Layout>
      <Breadcrumb pageTitle='Compare' />

      <div className='compare__page-wrap pt-90 pb-90'>
        <div className='container'>
          {compareItems && compareItems.length >= 1 ? (
            <div className='row'>
              <div className='col-lg-12'>
                <div className='compare__content-wrap'>
                  <div className='compare__table table-responsive'>
                    <table className='table table-bordered mb-0'>
                      <tbody>
                        <tr>
                          <td className='first__col'>Product Name</td>

                          {compareItems.map((compareItem, i) => (
                            <td className='product__img-title' key={i}>
                              <Link to={`/product/${compareItem.slug}`}>
                                <img
                                  src={
                                    compareItem.images &&
                                    compareItem.images.length
                                      ? compareItem.images[0].url
                                      : ""
                                  }
                                  alt={compareItem.title}
                                  className='img-fluid'
                                />
                              </Link>
                              <Link to='#' className='category'>
                                {compareItem.category}
                              </Link>
                              <Link
                                to={
                                  process.env.PUBLIC_URL +
                                  "/product/" +
                                  compareItem.slug
                                }
                                className='title'
                              >
                                {compareItem.title}
                              </Link>
                            </td>
                          ))}
                        </tr>

                        <tr>
                          <td className='first__col'>Description</td>
                          {compareItems.map((compareItem, i) => (
                            <td className='product__description' key={i}>
                              <p>{compareItem.shortDetails}</p>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className='first__col'>Price</td>
                          {compareItems.map((compareItem, i) => {
                            return (
                              <td className='compare__price' key={i}>
                                <span className='amount'>
                                  ${compareItem.price}
                                </span>
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className='first__col'>Stock</td>
                          {compareItems.map((compareItem, i) => (
                            <td className='product__instock' key={i}>
                              <p>{compareItem.stock}</p>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className='first__col'>Add to cart</td>
                          {compareItems.map((compareItem, i) => {
                            const cartItem = cartItems.filter(
                              (item) => item.id === compareItem.id
                            )[0];

                            return compareItem.stock &&
                              compareItem.stock > 0 ? (
                              <td key={i}>
                                <button
                                  className={
                                    cartItem !== undefined &&
                                    cartItem.quantity > 0
                                      ? "active"
                                      : ""
                                  }
                                  onClick={() =>
                                    addToCart(compareItem, addToast)
                                  }
                                  disabled={
                                    cartItem !== undefined &&
                                    cartItem.quantity > 0
                                  }
                                  title={
                                    cartItem !== undefined
                                      ? "Added to cart"
                                      : "Add to cart"
                                  }
                                >
                                  {cartItem !== undefined &&
                                  cartItem.quantity > 0
                                    ? "Added to cart"
                                    : "Add to cart"}
                                </button>
                              </td>
                            ) : (
                              <button disabled className='compare__cart'>
                                out od Stock
                              </button>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className='first__col'>Rating</td>
                          {compareItems.map((compareItem, i) => (
                            <td>
                              ratings
                              {/* {compareItem.rating && compareItem.rating > 0 ? (
                                <div>
                                  <div className='product__rating'>
                                    <Ratings value={compareItem.rating} />
                                  </div>
                                  <div className='product__rating'>
                                    <span>(40+)</span>
                                  </div>
                                </div>
                              ) : (
                                <div className='product__rating'>
                                  <span>No Reviews</span>
                                </div>
                              )} */}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className='first__col'>Remove</td>
                          {compareItems.map((compareItem, i) => (
                            <td className='product__remove' key={i}>
                              <button
                                onClick={() =>
                                  deleteFromCompare(compareItem, addToast)
                                }
                              >
                                <i className='fa fa-trash'></i>
                              </button>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='row'>
              <div className='col-lg-12'>
                <div className='empty__area text-center'>
                  <div className='empty__area-icon mb-30'>
                    <i className='fa fa-retweet'></i>
                  </div>
                  <div className='empty__area-text'>
                    <h3> No items found in compare </h3>
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
    cartItems: state.cartData,
    compareItems: state.compareData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },

    deleteFromCompare: (item, addToast) => {
      dispatch(deleteFromCompare(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Compare);
