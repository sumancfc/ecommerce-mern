import React from "react";
import Button from "../../../components/button";
import { Select } from "antd";

const { Option } = Select;

const ProductForm = ({
  categories,
  handleChange,
  handleSubmit,
  setValues,
  values,
  handleCatagoryChange,
  subOptions,
  showSub,
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

  console.log(subOptions);

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
          <select name='shipping' onChange={handleChange}>
            <option>Please select</option>
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
          <select name='color' onChange={handleChange}>
            <option>Please select</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div className='input__item'>
          <select name='brand' onChange={handleChange}>
            <option>Please select</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className='input__item'>
          <select name='category' onChange={handleCatagoryChange}>
            <option>Please select</option>
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        {showSub && (
          <div className='input__item'>
            <Select
              mode='multiple'
              style={{ width: "100%" }}
              placeholder='Please select'
              value={subs}
              onChange={(value) => setValues({ ...values, subs: value })}
            >
              {subOptions.length &&
                subOptions.map((s) => (
                  <Option key={s._id} value={s._id}>
                    {s.name}
                  </Option>
                ))}
            </Select>
          </div>
        )}

        <Button title='Create' />
      </form>
    </div>
  );
};

export default ProductForm;
