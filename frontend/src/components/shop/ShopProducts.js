import React from "react";
import ShopProductList from "./sub/ShopProductList";

const ShopProducts = ({ products, layout }) => {
  return (
    <div className='shop__bottom-area'>
      <div className={`row ${layout ? layout : ""}`}>
        <ShopProductList products={products} />
      </div>
    </div>
  );
};

export default ShopProducts;
