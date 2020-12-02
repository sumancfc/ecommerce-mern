import React from "react";
import { connect } from "react-redux";
import { getAllProducts } from "../../../helpers/product";
import Products from "./Products";

const ProductItems = ({ products }) => {
  //   console.log(products);
  return (
    <>
      {products.map((product) => {
        return <Products key={product._id} product={product} />;
      })}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    products: getAllProducts(
      state.productList.products,
      ownProps.type,
      ownProps.limit
    ),
  };
};

export default connect(mapStateToProps)(ProductItems);
