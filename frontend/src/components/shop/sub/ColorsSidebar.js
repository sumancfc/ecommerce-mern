import React from "react";
import { Radio } from "antd";

const ColorsSidebar = ({ colors, color, handleColor }) => {
  return (
    <>
      {colors.map((c) => (
        <Radio
          key={c}
          value={c}
          name={c}
          checked={c === color}
          onChange={handleColor}
          className='pb-1 pl-4 pr-4 w-100'
        >
          {c}
        </Radio>
      ))}
    </>
  );
};

export default ColorsSidebar;
