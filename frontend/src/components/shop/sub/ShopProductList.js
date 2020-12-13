import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  addToWishlist,
  getAllWishlist,
} from "../../../store/actions/wishlistAction";
import ShopProductItem from "./ShopProductItem";

const ShopProductList = ({ products, addToWishlist }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const user = useSelector((state) => state.userList);

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
            addToWishlist={addToWishlist}
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
    addToWishlist: (item, addToast, authtoken) => {
      dispatch(addToWishlist(item, addToast, authtoken));
    },
  };
};

export default connect(null, mapDispatchToProps)(ShopProductList);
