import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { addToCart } from "../../../store/actions/cartAction";
import { addToWishlist, getAllWishlist } from "../../../helpers/wishlist";
import ShopProductItem from "./ShopProductItem";

const ShopProductList = ({ products, addToCart }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const user = useSelector((state) => state.userList);
  const cartItems = useSelector((state) => state.cartData);

  useEffect(() => {
    loadWishlist();
    // eslint-disable-next-line
  }, []);

  const loadWishlist = () => {
    getAllWishlist(user.token).then((res) => {
      setWishlistItems(res.data.wishlist);
    });
  };

  const handleWishlist = (productId, addToast, authtoken) => {
    addToWishlist(productId, authtoken)
      .then((res) => {
        loadWishlist();
        addToast("Added To Wishlist", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {products.map((product) => {
        return (
          <ShopProductItem
            key={product._id}
            product={product}
            user={user}
            addToCart={addToCart}
            handleWishlist={handleWishlist}
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
  };
};

export default connect(null, mapDispatchToProps)(ShopProductList);
