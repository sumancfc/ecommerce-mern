import React from "react";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../helpers/product";
import { addToCart } from "../../../store/actions/cartAction";
import { getAllProductsFrom } from "../../../store/actions/productAction";
import {
  productToWishlist,
  getAllWishlist,
} from "../../../store/actions/wishlistAction";
import Products from "./Products";

const ProductItems = ({
  user,
  products,
  addToCart,
  cartItems,
  productToWishlist,
}) => {
  const { wishlist } = useSelector((state) => state.getWishlist.wishlists);
  // console.log(wishlistItems.wishlist);
  console.log(wishlist);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllWishlist(user.token));
    getAllProducts();
  }, [dispatch, user]);
  return (
    <>
      {products.map((product) => {
        return (
          <Products
            key={product._id}
            user={user}
            product={product}
            addTocart={addToCart}
            cartItem={
              cartItems.filter((cartItem) => cartItem.id === product._id)[0]
            }
            productToWishlist={productToWishlist}
            wishlistItem={
              wishlist.filter(
                (wishlistItem) => wishlistItem._id === product._id
              )[0]
            }
          />
        );
      })}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.userList,
    products: getAllProducts(
      state.productList.products,
      ownProps.type,
      ownProps.limit
    ),
    cartItems: state.cartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast) => {
      dispatch(addToCart(item, addToast));
    },
    productToWishlist: (item, addToast, authtoken) => {
      dispatch(productToWishlist(item, addToast, authtoken));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItems);
