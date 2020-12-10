import React from "react";
import Title from "../Title";
import ProductItems from "./common/ProductItems";

const ProductGrid = ({ type, limit, title, desc }) => {
  // console.log(type);
  return (
    <div className='product__area pt-80 pb-100'>
      <div className='container'>
        <Title title={title} desc={desc} />
        <div className='row'>
          <ProductItems type={type} limit={limit} />
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
