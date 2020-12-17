import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LinkButton from "../../../components/button/LinkButton";
import { deleteProduct, getProducts } from "../../../helpers/product";
import AdminProfile from "../AdminProfile";
import { useToasts } from "react-toast-notifications";
import ProductList from "../common/ProductList";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.userList);
  const { addToast } = useToasts();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    getProducts()
      .then((res) => {
        // console.log(res.data);
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const deleteProductHandler = (slug) => {
    const confirm = window.confirm("Do you want to delete this product?");

    if (confirm) {
      deleteProduct(slug, user.token)
        .then((res) => {
          addToast("Product deleted", {
            autoDismiss: true,
            appearance: "success",
          });
          loadProducts();
        })
        .catch((err) => {
          console.log(err);
          addToast(err.response.data.message, {
            appearance: "error",
            autoDismiss: true,
          });
        });
    }
  };

  return (
    <AdminProfile title='All Products'>
      <div className='text-right'>
        <LinkButton title='Create Product' link='/admin/product' />
      </div>

      <>
        {loading ? (
          <h4>Loading...</h4>
        ) : products && products.length >= 1 ? (
          <ProductList
            products={products}
            deleteProductHandler={deleteProductHandler}
          />
        ) : (
          <div className='row mt-40'>
            <h2>No Product found. Please Add Product</h2>
          </div>
        )}
      </>
    </AdminProfile>
  );
};

export default AllProducts;
