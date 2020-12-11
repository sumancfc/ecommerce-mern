import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Breadcrumb from "../components/breadcrumb";
import ProductGrid from "../components/products/ProductGrid";
import Products from "../components/products/common/Products";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySearch, getProductsByCount } from "../helpers/product";

const Shop = () => {
  const [products, setProducts] = useState([]);
  // const dispatch = useDispatch();

  const search = useSelector((state) => state.search);
  const { text } = search;

  useEffect(() => {
    getProductsByCount(8).then((res) => setProducts(res.data));
  }, []);

  const fetchProducts = (args) => {
    getProductBySearch(args).then((res) => {
      setProducts(res.data);
    });
  };

  console.log(products);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);

    return () => clearTimeout(delay);
  }, [text]);

  return (
    <Layout>
      <Breadcrumb pageTitle='Shop' />

      <div className='shop__area pt-90 pb-90 section-padding'>
        <div className='container-fluid'>
          <div className='row flex-row-reverse'>
            <div className='col-lg-9'>
              <div className='product__area '>
                <div className='container'>
                  <div className='row'>
                    {products.map((product) => {
                      return <Products key={product._id} product={product} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-3'></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
