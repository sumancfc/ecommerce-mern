import React from "react";
import Button from "../../../components/button";
import { Select } from "antd";

const { Option } = Select;

const UpdateProductForm = ({
  categories,
  handleChange,
  handleSubmit,
  setValues,
  values,
  handleCatagoryChange,
  subOptions,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
}) => {
  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  return (
    <div className='mt-45'>
      <form onSubmit={handleSubmit}>
        <div className='input__item'>
          <input
            type='text'
            name='title'
            value={title}
            placeholder='Enter product name'
            onChange={handleChange}
            required
          />
        </div>

        <div className='input__item'>
          <input
            type='text'
            name='description'
            value={description}
            placeholder='Enter description'
            onChange={handleChange}
            required
          />
        </div>

        <div className='input__item'>
          <input
            type='number'
            name='price'
            value={price}
            placeholder='Enter price'
            onChange={handleChange}
            required
          />
        </div>

        <div className='input__item'>
          <select
            name='shipping'
            value={shipping === "Yes" ? "Yes" : "No"}
            onChange={handleChange}
          >
            <option value='No'>No</option>
            <option value='Yes'>Yes</option>
          </select>
        </div>

        <div className='input__item'>
          <input
            type='number'
            name='quantity'
            value={quantity}
            placeholder='Enter quantity'
            onChange={handleChange}
            required
          />
        </div>

        <div className='input__item'>
          <select name='color' value={color} onChange={handleChange}>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div className='input__item'>
          <select name='brand' value={brand} onChange={handleChange}>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className='input__item'>
          <select
            name='category'
            value={selectedCategory ? selectedCategory : category._id}
            onChange={handleCatagoryChange}
          >
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        <div className='input__item'>
          <Select
            mode='multiple'
            style={{ width: "100%" }}
            placeholder='Please select'
            value={arrayOfSubs}
            onChange={(value) => setArrayOfSubs(value)}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>

        <Button title='Update' />
      </form>
    </div>
  );
};

export default UpdateProductForm;
