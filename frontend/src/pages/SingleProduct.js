import React, { useEffect, useState } from "react";
import SingleProductDesc from "../components/single/SingleProductDesc";
import SingleProductTop from "../components/single/SingleProductTop";
import { getProduct, getRelatedProduct } from "../helpers/product";
import Breadcrumb from "../components/breadcrumb";
import Layout from "../Layout";
import RelatedProduct from "../components/products/RelatedProduct";
import { connect, useSelector } from "react-redux";
import { addToWishlist, getAllWishlist } from "../helpers/wishlist";
import { addToCart } from "../store/actions/cartAction";

const SingleProduct = ({ match, addToCart }) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const slug = match.params.slug;

  const user = useSelector((state) => state.userList);
  const cartItems = useSelector((state) => state.cartData);

  console.log(cartItems);

  useEffect(() => {
    loadProduct();
    loadWishlist();
    //eslint-disable-next-line
  }, [slug]);

  const loadProduct = () => {
    getProduct(slug)
      .then((res) => {
        setProduct(res.data);
        getRelatedProduct(res.data._id).then((res) => setRelated(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    <Layout>
      <Breadcrumb pageTitle={product.title} />

      <SingleProductTop
        product={product}
        user={user}
        addToCart={addToCart}
        handleWishlist={handleWishlist}
        cartItems={cartItems}
        wishlistItem={
          wishlistItems.filter((item) => item._id === product._id)[0]
        }
      />

      <SingleProductDesc slug={slug} />

      <RelatedProduct
        related={related}
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
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
  };
};

export default connect(null, mapDispatchToProps)(SingleProduct);
