import React from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Layout from "../../Layout";
import Breadcrumb from "../../components/breadcrumb";

const AdminProfile = () => {
  return (
    <Layout>
      <Breadcrumb pageTitle='Admin Profile' />
      <div className='account__area pt-100 pb-100'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='account__page-wrap'>
                <Tab.Container defaultActiveKey='dashboard'>
                  <div className='row'>
                    <div className='col-lg-3 col-md-4'>
                      <Nav
                        variant='pills'
                        className='account__tab-menu nav bg-gray'
                      >
                        <Nav.Item>
                          <Nav.Link eventKey='dashboard'>
                            <i className='fa fa-dashboard'></i> Dashboard
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link eventKey='orders'>
                            <i className='fa fa-cart-arrow-down'></i> Orders
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link eventKey='payment'>
                            <i className='fa fa-credit-card'></i> Payment Method
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link eventKey='address'>
                            <i className='fa fa-map-marker'></i> address
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link eventKey='account'>
                            <i className='fa fa-user'></i> Account Details
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </div>

                    <div className='col-lg-9 col-md-8'>
                      <Tab.Content>
                        <Tab.Pane eventKey='dashboard'>
                          <div className='account__content'>
                            <h3>Dashboard</h3>
                            <div className='header__top-left'>
                              <p>
                                Hello, <strong>User Name</strong>
                              </p>
                            </div>

                            <p className='mb-0'>
                              From your account dashboard. you can easily check
                              & view your recent orders, manage your shipping
                              and billing addresses and edit your password and
                              account details.
                            </p>
                          </div>
                        </Tab.Pane>

                        <Tab.Pane eventKey='orders'>
                          <div className='account__content'>
                            <h3>Orders</h3>
                            <div className='account__table table-responsive text-center'>
                              <table className='table table-bordered'>
                                <thead className='thead-light'>
                                  <tr>
                                    <th>Order</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>Aug 22, 2018</td>
                                    <td>Pending</td>
                                    <td>$3000</td>
                                    <td>
                                      <Link to='/cart' className='btn-check'>
                                        View
                                      </Link>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2</td>
                                    <td>July 22, 2018</td>
                                    <td>Approved</td>
                                    <td>$200</td>
                                    <td>
                                      <Link to='/cart' className='btn-check'>
                                        View
                                      </Link>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>June 12, 2017</td>
                                    <td>On Hold</td>
                                    <td>$990</td>
                                    <td>
                                      <Link to='/cart' className='btn-check'>
                                        View
                                      </Link>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </Tab.Pane>

                        <Tab.Pane eventKey='payment'>
                          <div className='account__content'>
                            <h3>Payment Method</h3>
                            <p className='message__saved'>
                              You Can't Saved Your Payment Method yet.
                            </p>
                          </div>
                        </Tab.Pane>

                        <Tab.Pane eventKey='address'>
                          <div className='account__content'>
                            <h3>Billing Address</h3>
                            <address>
                              <p>
                                <strong>Alex Tuntuni</strong>
                              </p>
                              <p>
                                1355 Market St, Suite 900 <br />
                                San Francisco, CA 94103
                              </p>
                              <p>Mobile: (123) 456-7890</p>
                            </address>
                            <Link to='#' className='btn-check'>
                              <i className='fa fa-edit'></i> Edit Address
                            </Link>
                          </div>
                        </Tab.Pane>

                        <Tab.Pane eventKey='account'>
                          <div className='account__content'>
                            <h3>Account Details</h3>
                            <div className='account__form'>
                              <form action='#'>
                                <div className='row'>
                                  <div className='col-lg-6'>
                                    <div className='input__item'>
                                      <label
                                        htmlFor='first-name'
                                        className='required'
                                      >
                                        First Name
                                      </label>
                                      <input type='text' id='first-name' />
                                    </div>
                                  </div>
                                  <div className='col-lg-6'>
                                    <div className='input__item'>
                                      <label
                                        htmlFor='last-name'
                                        className='required'
                                      >
                                        Last Name
                                      </label>
                                      <input type='text' id='last-name' />
                                    </div>
                                  </div>
                                </div>
                                <div className='input__item'>
                                  <label
                                    htmlFor='display-name'
                                    className='required'
                                  >
                                    Display Name
                                  </label>
                                  <input type='text' id='display-name' />
                                </div>
                                <div className='input__item'>
                                  <label htmlFor='email' className='required'>
                                    Email Addres
                                  </label>
                                  <input type='email' id='email' />
                                </div>
                                <fieldset>
                                  <legend>Password change</legend>
                                  <div className='input__item'>
                                    <label
                                      htmlFor='current-pwd'
                                      className='required'
                                    >
                                      Current Password
                                    </label>
                                    <input type='password' id='current-pwd' />
                                  </div>
                                  <div className='row'>
                                    <div className='col-lg-6'>
                                      <div className='input__item'>
                                        <label
                                          htmlFor='new-pwd'
                                          className='required'
                                        >
                                          New Password
                                        </label>
                                        <input type='password' id='new-pwd' />
                                      </div>
                                    </div>
                                    <div className='col-lg-6'>
                                      <div className='input__item'>
                                        <label
                                          htmlFor='confirm-pwd'
                                          className='required'
                                        >
                                          Confirm Password
                                        </label>
                                        <input
                                          type='password'
                                          id='confirm-pwd'
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </fieldset>
                                <div className='input__item'>
                                  <button className='btn-check'>
                                    Save Changes
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </div>
                  </div>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProfile;
