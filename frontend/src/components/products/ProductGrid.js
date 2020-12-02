import React from "react";
import Title from "../Title";
import ProductItems from "./common/ProductItems";
import "./Product.css";

const ProductGrid = ({ limit, type, title, desc }) => {
  return (
    <div className='product__area pt-80 pb-100'>
      <div className='container'>
        <Title title={title} desc={desc} />
        <div className='row'>
          <ProductItems limit={limit} type={type} />
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
