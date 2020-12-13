import React, { useEffect, useState } from "react";
import SingleProductDesc from "../components/single/SingleProductDesc";
import SingleProductTop from "../components/single/SingleProductTop";
import { getProduct, getRelatedProduct } from "../helpers/product";
import Breadcrumb from "../components/breadcrumb";
import Layout from "../Layout";
import RelatedProduct from "../components/products/RelatedProduct";
import { connect, useSelector } from "react-redux";
import { addToWishlist, getAllWishlist } from "../store/actions/wishlistAction";

const SingleProduct = ({ match, addToWishlist }) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const slug = match.params.slug;

  const user = useSelector((state) => state.userList);

  useEffect(() => {
    loadProduct();
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

  useEffect(() => {
    getAllWishlist(user.token).then((res) => {
      setWishlistItems(res.data.wishlist);
      loadProduct();
    });
    //eslint-disable-next-line
  }, [user]);

  return (
    <Layout>
      <Breadcrumb pageTitle={product.title} />

      <SingleProductTop
        product={product}
        user={user}
        addToWishlist={addToWishlist}
        wishlistItem={
          wishlistItems.filter((item) => item._id === product._id)[0]
        }
      />

      <SingleProductDesc slug={slug} />

      <RelatedProduct
        related={related}
        user={user}
        addToWishlist={addToWishlist}
        wishlistItem={
          wishlistItems.filter((item) => item._id === product._id)[0]
        }
      />
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToWishlist: (item, addToast, authtoken) => {
      dispatch(addToWishlist(item, addToast, authtoken));
    },
  };
};

export default connect(null, mapDispatchToProps)(SingleProduct);
