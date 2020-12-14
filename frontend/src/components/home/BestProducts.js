import React, { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { getProductAB } from "../../helpers/product";
import { addToCart } from "../../store/actions/cartAction";
import {
  addToWishlist,
  getAllWishlist,
} from "../../store/actions/wishlistAction";
import { addToCompare } from "../../store/actions/compareAction";
import ProductCard from "../products/ProductCard";
import Title from "../Title";

const BestProducts = ({
  title,
  desc,
  addToCart,
  addToWishlist,
  addToCompare,
}) => {
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const user = useSelector((state) => state.userList);
  const cartItems = useSelector((state) => state.cartData);
  const compareItems = useSelector((state) => state.compareData);

  useEffect(() => {
    getProductAB("sold", "desc", 8).then((res) => setProducts(res.data));
    getAllWishlist(user.token).then((res) => {
      setWishlistItems(res.data.wishlist);
    });
  }, [user]);

  return (
    <>
      <div className='product__area pt-80 pb-100'>
        <div className='container'>
          <Title title={title} desc={desc} />
          <div className='row'>
            {products.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  user={user}
                  addToCart={addToCart}
                  addToWishlist={addToWishlist}
                  addToCompare={addToCompare}
                  cartItem={
                    cartItems.filter(
                      (cartItem) => cartItem._id === product._id
                    )[0]
                  }
                  wishlistItem={
                    wishlistItems.filter((item) => item._id === product._id)[0]
                  }
                  compareItem={
                    compareItems.filter(
                      (compareItem) => compareItem._id === product._id
                    )[0]
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    addToWishlist: (item, addToast, authtoken) => {
      dispatch(addToWishlist(item, addToast, authtoken));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    },
  };
};

export default connect(null, mapDispatchToProps)(BestProducts);
