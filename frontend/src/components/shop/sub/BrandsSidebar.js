import React from "react";
import { Radio } from "antd";

const BrandsSidebar = ({ brands, brand, handleBrand }) => {
  return (
    <>
      {brands.map((b) => (
        <Radio
          key={b}
          name={b}
          value={b}
          className='pb-1 pl-4 pr-4 w-100'
          checked={b === brand}
          onChange={handleBrand}
        >
          {b}
        </Radio>
      ))}
    </>
  );
};

export default BrandsSidebar;
