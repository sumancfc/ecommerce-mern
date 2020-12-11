import React from "react";
import { Checkbox } from "antd";

const CategoriesSidebar = ({ categories, handleCheck, categoryIds }) => {
  return (
    <>
      {categories.map((category) => {
        return (
          <div key={category._id}>
            <Checkbox
              className='pb-2 pl-4 pr-4'
              name='category'
              value={category._id}
              onChange={handleCheck}
              checked={categoryIds.includes(category._id)}
            >
              {category.name}
            </Checkbox>
            <br />
          </div>
        );
      })}
    </>
  );
};

export default CategoriesSidebar;
