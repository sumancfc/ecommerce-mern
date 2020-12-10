import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../components/breadcrumb";
import Layout from "../Layout";
import { getSingleCat } from "../store/actions/categoryAction";
import Products from "../components/products/common/Products";

const CategoryGrid = ({ match }) => {
  const singleCategory = useSelector((state) => state.categorySingle);

  const { products } = singleCategory;

  //   console.log(category);
  //   console.log(products);
  const dispatch = useDispatch();

  const slug = match.params.slug;

  useEffect(() => {
    dispatch(getSingleCat(slug));
  }, [dispatch, slug]);
  return (
    <Layout>
      <Breadcrumb pageTitle={`${slug} categories`} />
      <div className='product__area pt-80 pb-70'>
        <div className='container'>
          <div className='row'>
            {products &&
              products.map((product) => {
                return <Products key={product._id} product={product} />;
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryGrid;
