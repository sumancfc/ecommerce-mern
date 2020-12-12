import React from "react";
import CategoryList from "../components/category";
import BestProducts from "../components/home/BestProducts";
import NewArrivals from "../components/home/NewArrivals";
import HeroSlider from "../components/slider";
import Layout from "../Layout";

const Home = () => {
  return (
    <Layout>
      {/* Best Seller  */}
      <BestProducts
        title='Best Products'
        desc='lorem ipsum lorem ipsum lorem ipsumv lorem ipsum'
      />
      <HeroSlider />
      {/* New Arrival */}
      <NewArrivals
        title='New Arrivals'
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
