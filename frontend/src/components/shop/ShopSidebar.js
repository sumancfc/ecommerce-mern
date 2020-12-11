import React from "react";
import { Menu } from "antd";
import PriceSidebar from "./sub/PriceSidebar";
import CategoriesSidebar from "./sub/CategoriesSidebar";
import SubcategoriesSidebar from "./sub/SubcategoriesSidebar";
import BrandsSidebar from "./sub/BrandsSidebar";
import ShippingSidebar from "./sub/ShippingSidebar";
import ColorsSidebar from "./sub/ColorsSidebar";

const { SubMenu } = Menu;

const ShopSidebar = ({
  price,
  handleSlider,
  categories,
  handleCheck,
  categoryIds,
  subs,
  hanldeSubcategory,
  brands,
  brand,
  handleBrand,
  shipping,
  handleShipping,
  colors,
  color,
  handleColor,
}) => {
  return (
    <div className='sidebar__wrapper'>
      <div className='shop__price-filter mt-35 shop__sidebar-border pt-40 sidebar__widget'>
        <Menu
          defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
          mode='inline'
        >
          {/* price */}
          <SubMenu key='1' title={<div className='sidebar__title'>Price</div>}>
            <PriceSidebar price={price} handleSlider={handleSlider} />
          </SubMenu>

          {/* Category */}
          <SubMenu
            key='2'
            title={<div className='sidebar__title'>Categories</div>}
          >
            <CategoriesSidebar
              categories={categories}
              handleCheck={handleCheck}
              categoryIds={categoryIds}
            />
          </SubMenu>

          {/* Sub Category */}
          <SubMenu
            key='3'
            title={<div className='sidebar__title'>Sub Categories</div>}
          >
            <SubcategoriesSidebar
              subs={subs}
              hanldeSubcategory={hanldeSubcategory}
            />
          </SubMenu>

          {/* Brand */}
          <SubMenu key='4' title={<div className='sidebar__title'>Brands</div>}>
            <BrandsSidebar
              brands={brands}
              brand={brand}
              handleBrand={handleBrand}
            />
          </SubMenu>

          {/* Shipping */}
          <SubMenu
            key='5'
            title={<div className='sidebar__title'>Shipping</div>}
          >
            <ShippingSidebar
              shipping={shipping}
              handleShipping={handleShipping}
            />
          </SubMenu>

          {/* Colors */}
          <SubMenu key='6' title={<div className='sidebar__title'>Colors</div>}>
            <ColorsSidebar
              colors={colors}
              color={color}
              handleColor={handleColor}
            />
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
};

export default ShopSidebar;
