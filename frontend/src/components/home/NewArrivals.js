import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getProductAB } from "../../helpers/product";
import { addToCart } from "../../store/actions/cartAction";
import { addToWishlist, getAllWishlist } from "../../helpers/wishlist";
import ProductCard from "../products/ProductCard";
import Title from "../Title";

const NewArrivals = ({ title, desc, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const user = useSelector((state) => state.userList);
  const cartItems = useSelector((state) => state.cartData);

  useEffect(() => {
    getProductAB("createdAt", "desc", 8).then((res) => setProducts(res.data));
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
                  handleWishlist={handleWishlist}
                  cartItem={
                    cartItems.filter(
                      (cartItem) => cartItem._id === product._id
                    )[0]
                  }
                  wishlistItem={
                    wishlistItems.filter((item) => item._id === product._id)[0]
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
  };
};

export default connect(null, mapDispatchToProps)(NewArrivals);
