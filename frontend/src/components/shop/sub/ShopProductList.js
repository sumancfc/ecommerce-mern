import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { addToCart } from "../../../store/actions/cartAction";
import {
  addToWishlist,
  getAllWishlist,
} from "../../../store/actions/wishlistAction";
import ShopProductItem from "./ShopProductItem";

const ShopProductList = ({ products, addToCart, addToWishlist }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const user = useSelector((state) => state.userList);
  const cartItems = useSelector((state) => state.cartData);

  useEffect(() => {
    getAllWishlist(user.token).then((res) => {
      setWishlistItems(res.data.wishlist);
    });
  }, [user]);
  return (
    <>
      {products.map((product) => {
        return (
          <ShopProductItem
            key={product._id}
            product={product}
            user={user}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            cartItem={
              cartItems.filter((cartItem) => cartItem._id === product._id)[0]
            }
            wishlistItem={
              wishlistItems.filter((item) => item._id === product._id)[0]
            }
          />
        );
      })}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    addToWishlist: (item, addToast, authtoken) => {
      dispatch(addToWishlist(item, addToast, authtoken));
    },
  };
};

export default connect(null, mapDispatchToProps)(ShopProductList);
