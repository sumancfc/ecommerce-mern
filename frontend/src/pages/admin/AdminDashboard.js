import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../Layout";

const AdminProfile = ({ children, title }) => {
  return (
    <Layout>
      <div className='account__area pt-100 pb-100'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='account__page-wrap'>
                <div className='row'>
                  <div className='col-lg-3 col-md-4'>
                    <ul
                      variant='tabs'
                      className='account__tab-menu nav bg-gray'
                    >
                      <li>
                        <Link to='/admin/dashboard'>
                          <i className='fa fa-dashboard'></i> Dashboard
                        </Link>
                      </li>

                      <li>
                        <Link to='/admin/category'>Category</Link>
                      </li>

                      <li>
                        <Link to='/admin/subcategory'>Sub Category</Link>
                      </li>

                      <li>
                        <Link to='/admin/products'>Products</Link>
                      </li>

                      <li>
                        <Link to='/admin/payment'>
                          <i className='fa fa-credit-card'></i> Payment Method
                        </Link>
                      </li>

                      <li>
                        <Link to='/admin/address'>
                          <i className='fa fa-map-marker'></i> address
                        </Link>
                      </li>

                      <li>
                        <Link to='/admin/account'>
                          <i className='fa fa-user'></i> Account Details
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className='col-lg-9 col-md-8'>
                    <div className='account__content'>
                      <h3>{title}</h3>
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProfile;
