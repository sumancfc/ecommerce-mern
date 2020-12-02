import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductGrid from "../components/products/ProductGrid";
import HeroSlider from "../components/slider";
import Layout from "../Layout";
import { getAllProductsFrom } from "../store/actions/productAction";

const Home = () => {
  const products = useSelector((state) => state.productList.products);

  // console.log(products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsFrom());
  }, [dispatch]);

  return (
    <Layout>
      <HeroSlider />
      {/* New Arrival */}
      <ProductGrid
        limit={4}
        type='bestSeller'
        title='New Products'
        desc='lorem ipsum lorem ipsum lorem ipsumv lorem ipsum'
      />
      {/* Best Seller */}
      <ProductGrid
        limit={6}
        type='new'
        title='Best Products'
        desc='lorem ipsum lorem ipsum lorem ipsumv lorem ipsum'
      />
    </Layout>
  );
};

export default Home;
