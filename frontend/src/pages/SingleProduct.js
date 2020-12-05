import React, { useEffect, useState } from "react";
import SingleProductDesc from "../components/single/SingleProductDesc";
import SingleProductTop from "../components/single/SingleProductTop";
import { getProduct } from "../helpers/product";
import Breadcrumb from "../components/breadcrumb";
import Layout from "../Layout";

const SingleProduct = ({ match }) => {
  const [product, setProduct] = useState({});

  const slug = match.params.slug;

  useEffect(() => {
    loadProduct();
    //eslint-disable-next-line
  }, [slug]);

  const loadProduct = () => {
    getProduct(slug)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <Breadcrumb pageTitle={product.title} />

      <SingleProductTop product={product} />

      <SingleProductDesc />
    </Layout>
  );
};

export default SingleProduct;
