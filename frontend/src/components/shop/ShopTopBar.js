// import React from "react";
// import { Link } from "react-router-dom";
// import { setActiveLayout } from "../../helpers/product";

// const ShopTopbar = ({
//   getLayout,
//   getFilterSort,
//   productNum,
//   productSortedNum,
// }) => {
//   return (
//     <div className='shop__topbar-wrapper'>
//       <div className='shop__topbar-left'>
//         <div className='view__mode nav'>
//           <Link
//             to='#'
//             className='active'
//             onClick={(e) => {
//               getLayout("grid");
//               setActiveLayout(e);
//             }}
//           >
//             <i className='la la-th'></i>
//           </Link>
//           <Link
//             to='#'
//             onClick={(e) => {
//               getLayout("list");
//               setActiveLayout(e);
//             }}
//           >
//             <i className='la la-list-ul'></i>
//           </Link>
//         </div>
//         <p>
//           Showing {productSortedNum} of {productNum} result
//         </p>
//       </div>
//       <div className='product__sorting-wrapper'>
//         <div className='product__show shorting__style'>
//           <label>Sort by:</label>
//           <select onChange={(e) => getFilterSort("filterSort", e.target.value)}>
//             <option value='default'>Default</option>
//             <option value='priceHighToLow'>Price - High to Low</option>
//             <option value='priceLowToHigh'>Price - Low to High</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopTopbar;
