import React from "react";
import Title from "../Title";
import ProductItems from "./common/ProductItems";

const ProductGrid = ({ title, desc }) => {
  // console.log(type);
  return (
    <div className='product__area pt-80 pb-100'>
      <div className='container'>
        <Title title={title} desc={desc} />
        <div className='row'>
          <ProductItems />
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
