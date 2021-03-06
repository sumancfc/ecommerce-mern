import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useSelector, useDispatch } from "react-redux";
import Breadcrumb from "../../components/breadcrumb";
import {
  deleteFromWishlist,
  getAllWishlist,
} from "../../store/actions/wishlistAction";
import Layout from "../../Layout";
import { addToCart } from "../../store/actions/cartAction";

const Wishlist = () => {
  const { addToast } = useToasts();

  const [wishlistItems, setWishlistItems] = useState([]);

  const user = useSelector((state) => state.userList);
  const cartItems = useSelector((state) => state.cartData);

  const dispatch = useDispatch();

  console.log(wishlistItems);
  useEffect(() => {
    loadWishlist();
    // eslint-disable-next-line
  }, []);

  const loadWishlist = () => {
    getAllWishlist(user.token).then((res) => {
      setWishlistItems(res.data.wishlist);
    });
  };

  const handleAddToCart = (item, addToast) => {
    dispatch(addToCart(item, addToast));
    console.log("item added", item.title);
    setTimeout(() => {
      deleteFromWishlist(item._id, user.token).then((res) => {
        loadWishlist();
        addToast("Product deleted from wishlist", {
          appearance: "error",
          autoDismiss: true,
        });
      });
    }, 500);
  };

  const handleRemove = (productId) => {
    deleteFromWishlist(productId, user.token).then((res) => {
      loadWishlist();
      addToast("Product deleted from wishlist", {
        appearance: "error",
        autoDismiss: true,
      });
    });
  };

  return (
    <Layout>
      <Breadcrumb pageTitle='Wishlist' />

      <div className='cart__main-area pt-85 pb-90'>
        <div className='container'>
          {wishlistItems && wishlistItems.length >= 1 ? (
            <>
              <h3 className='cart__page-title'>Your wishlist items</h3>
              <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                  <div className='table-content table-responsive cart__table-content'>
                    <table>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Product Name</th>
                          <th>Until Price</th>
                          <th>Add To Cart</th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {wishlistItems.map((wishlistItem, i) => {
                          const {
                            images,
                            slug,
                            title,
                            price,
                            quantity,
                          } = wishlistItem;

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
                              <td className='product__wishlist-cart'>
                                {quantity && quantity > 0 ? (
                                  cartItems.filter(
                                    (item) => item._id === wishlistItem._id
                                  )[0] ? (
                                    <button>Added To Cart</button>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        handleAddToCart(wishlistItem, addToast)
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
                              <td className='product__remove'>
                                <Link
                                  to='#'
                                  onClick={() => handleRemove(wishlistItem._id)}
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
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className='row'>
              <div className='col-lg-12'>
                <div className='empty__area text-center'>
                  <div className='empty__area-icon mb-30'>
                    <i className='fa fa-heart-o'></i>
                  </div>
                  <div className='empty__area-text'>
                    <h3> No items found in wishlist </h3>
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

export default Wishlist;
