import React from "react";
import Button from "../../../components/button";

const CategoryForm = ({
  handleCategory,
  value,
  setName,
  title,
  placeholder,
}) => {
  return (
    <form onSubmit={handleCategory}>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='input__item'>
            <input
              type='text'
              name='category'
              placeholder={placeholder}
              value={value}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <Button title={title} />
    </form>
  );
};

export default CategoryForm;
