import React from "react";
import ShopProductItem from "./ShopProductItem";

const ShopProductList = ({ products }) => {
  return (
    <>
      {products.map((product) => {
        return <ShopProductItem key={product._id} product={product} />;
      })}
    </>
  );
};

export default ShopProductList;