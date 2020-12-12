import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getProductAB } from "../../helpers/product";
import {
  addToWishlist,
  getAllWishlist,
} from "../../store/actions/wishlistAction";
import ProductCard from "../products/ProductCard";
import Title from "../Title";

const NewArrivals = ({ title, desc, addToWishlist }) => {
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const user = useSelector((state) => state.userList);

  useEffect(() => {
    getProductAB("createdAt", "desc", 8).then((res) => setProducts(res.data));
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
                  addToWishlist={addToWishlist}
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
    addToWishlist: (item, addToast, authtoken) => {
      dispatch(addToWishlist(item, addToast, authtoken));
    },
  };
};

export default connect(null, mapDispatchToProps)(NewArrivals);
