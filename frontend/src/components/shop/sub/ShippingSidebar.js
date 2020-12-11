import React from "react";
import { Checkbox } from "antd";

const ShippingSidebar = ({ shipping, handleShipping }) => {
  return (
    <>
      <Checkbox
        className='pb-2 pl-4 pr-4 w-100'
        onChange={handleShipping}
        value='Yes'
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        className='pb-2 pl-4 pr-4 w-100'
        onChange={handleShipping}
        value='No'
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );
};

export default ShippingSidebar;
