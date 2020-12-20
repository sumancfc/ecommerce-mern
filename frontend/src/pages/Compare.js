import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout";
import Breadcrumb from "../components/breadcrumb";
import { addToCart } from "../store/actions/cartAction";
import { showAverage } from "../helpers/averageRating";
import { deleteFromCompare, getAllCompare } from "../helpers/compare";

const Compare = () => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const [compareItems, setCompareItems] = useState([]);

  const user = useSelector((state) => state.userList);
  const cartItems = useSelector((state) => state.cartData);

  useEffect(() => {
    loadCompare();
    // eslint-disable-next-line
  }, []);

  const loadCompare = () => {
    getAllCompare(user.token).then((res) => setCompareItems(res.data.compare));
  };

  const handleAddToCart = (item, addToast) => {
    dispatch(addToCart(item, addToast));
  };

  const handleRemove = (productId) => {
    deleteFromCompare(productId, user.token).then((res) => {
      loadCompare();
      addToast("Product deleted from compare", {
        appearance: "error",
        autoDismiss: true,
      });
    });
  };

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
                          <td className='first__col'>Product Image</td>

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
                                  alt={compareItem.slug}
                                  className='img-fluid'
                                />
                              </Link>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className='first__col'>Product Name</td>
                          {compareItems.map((compareItem, i) => (
                            <td className='product__description' key={i}>
                              <Link to={`/product/${compareItem.slug}`}>
                                {compareItem.title}
                              </Link>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className='first__col'>Description</td>
                          {compareItems.map((compareItem, i) => (
                            <td className='product__description' key={i}>
                              <p>{compareItem.description}</p>
                            </td>
                          ))}
                        </tr>

                        <tr>
                          <td className='first__col'>Price</td>
                          {compareItems.map((compareItem, i) => (
                            <td className='compare__price' key={i}>
                              <span className='amount'>
                                ${compareItem.price}
                              </span>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className='first__col'>Stock</td>
                          {compareItems.map((compareItem, i) => (
                            <td className='product__instock' key={i}>
                              {compareItem.quantity > 0 ? (
                                <h5 className='text-success'>In Stock</h5>
                              ) : (
                                <h5 className='text-danger'>Out Of Stock</h5>
                              )}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className='first__col'>Add to cart</td>
                          {compareItems.map((compareItem, i) => {
                            const { quantity, _id } = compareItem;
                            return (
                              <td key={i}>
                                {quantity && quantity > 0 ? (
                                  cartItems.filter(
                                    (item) => item._id === _id
                                  )[0] ? (
                                    <button>Added To Cart</button>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        handleAddToCart(compareItem, addToast)
                                      }
                                    >
                                      Add To Cart
                                    </button>
                                  )
                                ) : (
                                  <button disabled className='active'>
                                    Out of stock
                                  </button>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className='first__col'>Rating</td>
                          {compareItems.map((compareItem, i) => (
                            <td key={i}>
                              {compareItem.reviews &&
                              compareItem.reviews.length > 0 ? (
                                showAverage(compareItem)
                              ) : (
                                <span>No review Yet</span>
                              )}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className='first__col'>Remove</td>
                          {compareItems.map((compareItem, i) => (
                            <td className='product__remove' key={i}>
                              <button
                                onClick={() =>
                                  handleRemove(compareItem._id, addToast)
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

export default Compare;
