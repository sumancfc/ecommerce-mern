import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { addToCart } from "../../../store/actions/cartAction";
import { addToWishlist, getAllWishlist } from "../../../helpers/wishlist";
import { addToCompare, getAllCompare } from "../../../helpers/compare";
import ShopProductItem from "./ShopProductItem";

const ShopProductList = ({ products, addToCart }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [compareItems, setCompareItems] = useState([]);

  const user = useSelector((state) => state.userList);
  const cartItems = useSelector((state) => state.cartData);

  useEffect(() => {
    loadWishlist();
    loadCompare();
    // eslint-disable-next-line
  }, []);

  const loadWishlist = () => {
    getAllWishlist(user.token).then((res) => {
      setWishlistItems(res.data.wishlist);
    });
  };

  const loadCompare = () => {
    getAllCompare(user.token).then((res) => setCompareItems(res.data.compare));
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

  const handleCompare = (productId, addToast, authtoken) => {
    addToCompare(productId, authtoken)
      .then((res) => {
        loadCompare();
        addToast("Added To Compare", {
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
            handleCompare={handleCompare}
            cartItem={
              cartItems.filter((cartItem) => cartItem._id === product._id)[0]
            }
            wishlistItem={
              wishlistItems.filter((item) => item._id === product._id)[0]
            }
            compareItem={
              compareItems.filter((item) => item._id === product._id)[0]
            }
          />
        );
      })}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
  };
};

export default connect(null, mapDispatchToProps)(ShopProductList);
