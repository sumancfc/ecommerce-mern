import React from "react";
import { Slider } from "antd";

const PriceSidebar = ({ price, handleSlider }) => {
  return (
    <div>
      <Slider
        className='ml-4 mr-4'
        tipFormatter={(v) => `$${v}`}
        range
        value={price}
        onChange={handleSlider}
        max='100000'
      />
    </div>
  );
};

export default PriceSidebar;
