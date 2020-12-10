import React, { useEffect, useState } from "react";
import SingleProductDesc from "../components/single/SingleProductDesc";
import SingleProductTop from "../components/single/SingleProductTop";
import { getProduct, getRelatedProduct } from "../helpers/product";
import Breadcrumb from "../components/breadcrumb";
import Layout from "../Layout";
import RelatedProduct from "../components/products/RelatedProduct";

const SingleProduct = ({ match }) => {
  const [product, setProduct] = useState({});
  const [related, setrelated] = useState([]);

  const slug = match.params.slug;

  useEffect(() => {
    loadProduct();
    //eslint-disable-next-line
  }, [slug]);

  const loadProduct = () => {
    getProduct(slug)
      .then((res) => {
        setProduct(res.data);
        getRelatedProduct(res.data._id).then((res) => setrelated(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <Breadcrumb pageTitle={product.title} />

      <SingleProductTop product={product} />

      <SingleProductDesc slug={slug} />

      <RelatedProduct related={related} />
    </Layout>
  );
};

export default SingleProduct;
