import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../Layout";

const UserDashboard = ({ children, title }) => {
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
                        <Link to='/user/dashboard'>
                          <i className='fa fa-dashboard'></i> User Dashboard
                        </Link>
                      </li>

                      <li>
                        <Link to='/user/wishlist'>Wishlist</Link>
                      </li>

                      <li>
                        <Link to='/user/history'>Purchase History</Link>
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

export default UserDashboard;
