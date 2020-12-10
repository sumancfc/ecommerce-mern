import React from "react";
import Title from "../Title";
import Products from "./common/Products";

const RelatedProduct = ({ related }) => {
  console.log(related);
  return (
    <div className='product__area pt-80 pb-100'>
      <div className='container'>
        <Title title='Related Product' desc='' />
        <div className='row'>
          {related.length === 0 && (
            <div className='text-center'>No Related Products Found</div>
          )}

          {related &&
            related.map((product) => {
              return <Products key={product._id} product={product} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
