import React from "react";
import { Link } from "react-router-dom";
import laptop from "../../../assets/images/product-8.jpg";

const ProductList = ({ products, deleteProductHandler }) => {
  return (
    <div className='row mt-40'>
      <div className='col-sm-12 col-md-12'>
        <div className='table-content table-responsive table__content'>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Until Price</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const { title, images, price, slug } = product;
                return (
                  <tr key={product._id}>
                    <td className='product__thumbnail'>
                      <Link to={`/product/${slug}`}>
                        <img
                          src={images && images.length ? images[0].url : laptop}
                          alt={slug}
                          className='img-fluid'
                        />
                      </Link>
                    </td>
                    <td className='product__name'>
                      <Link to={`/product/${slug}`}>{title}</Link>
                    </td>
                    <td className='product__price-cart'>
                      <span className='amount'>${price}</span>
                    </td>

                    <td className='product__remove'>
                      <Link to={`/admin/product/${slug}`}>
                        <i className='fa fa-pencil'></i>
                      </Link>
                      <button onClick={() => deleteProductHandler(slug)}>
                        <i className='fa fa-trash'></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
