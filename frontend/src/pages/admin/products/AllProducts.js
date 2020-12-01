import React from "react";
import LinkButton from "../../../components/button/LinkButton";
import AdminProfile from "../AdminDashboard";

const AllProducts = () => {
  return (
    <AdminProfile title='Products'>
      <div className='text-right'>
        <LinkButton title='Create Product' link='/admin/product' />
      </div>
    </AdminProfile>
  );
};

export default AllProducts;
