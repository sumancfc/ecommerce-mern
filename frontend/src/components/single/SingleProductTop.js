import React from "react";
import { useToasts } from "react-toast-notifications";
import ProductImageSlider from "./sub/ProductImageSlider";
import ProductInfo from "./sub/ProductInfo";

const SingleProductTop = ({ product }) => {
  const { addToast } = useToasts();

  return (
    <div className='product__details-area pt-90 pb-90'>
      <div className='container'>
        <div className='row'>
          <ProductImageSlider product={product} />

          <ProductInfo product={product} addToast={addToast} />
        </div>
      </div>
    </div>
  );
};

export default SingleProductTop;
