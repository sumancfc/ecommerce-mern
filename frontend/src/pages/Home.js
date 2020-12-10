import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import CategoryList from "../components/category";
import ProductGrid from "../components/products/ProductGrid";
import HeroSlider from "../components/slider";
import Layout from "../Layout";
import { getAllProductsFrom } from "../store/actions/productAction";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsFrom());
  }, [dispatch]);

  return (
    <Layout>
      {/* Best Seller  */}
      <ProductGrid
        type='bestSeller'
        limit={4}
        title='Best Products'
        desc='lorem ipsum lorem ipsum lorem ipsumv lorem ipsum'
      />
      <HeroSlider />
      {/* New Arrival */}
      <ProductGrid
        type='bestPrice'
        limit={4}
        title='Best Price'
        desc='lorem ipsum lorem ipsum lorem ipsumv lorem ipsum'
      />

      <CategoryList
        title='Top Categories'
        desc='lorem ipsum lorem ipsum lorem ipsumv lorem ipsum'
      />
    </Layout>
  );
};

export default Home;
