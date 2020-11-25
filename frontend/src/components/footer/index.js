import React from "react";
import { Link } from "react-router-dom";
import Logo from "../logo";

const Footer = () => {
  return (
    <footer className='footer__area'>
      <div className='footer__area-top bg-gray pt-120 pb-85'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3 col-md-3 col-12 col-sm-6'>
              <div className='footer__area-widget mb-30'>
                <Logo />
                <div className='footer__area-social'>
                  <span>Follow us:</span>
                  <ul>
                    <li>
                      <Link to='#'>
                        <i className='fa fa-facebook'></i>
                      </Link>
                    </li>
                    <li>
                      <Link to='#'>
                        <i className='fa fa-twitter'></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-3 col-12 col-sm-6'>
              <div className='footer__area-widget mb-30 footer__area-ml'>
                <div className='footer__area-title'>
                  <h3>Useful Link</h3>
                </div>
                <div className='footer__area-list'>
                  <ul>
                    <li>
                      <Link to='/cart'>Shopping Cart</Link>
                    </li>
                    <li>
                      <Link to='/wishlist'>Wishlist</Link>
                    </li>
                    <li>
                      <Link to='/checkout'>Chekout</Link>
                    </li>
                    <li>
                      <Link to='/contact-us'>Support</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-2 col-12 col-sm-6'>
              <div className='footer__area-widget mb-30'>
                <div className='footer__area-title'>
                  <h3>About us</h3>
                </div>
                <div className='footer__area-list'>
                  <ul>
                    <li>
                      <Link to='/about'>About</Link>
                    </li>
                    <li>
                      <Link to='/shop'>Products</Link>
                    </li>
                    <li>
                      <Link to='/terms-and-conditions'>
                        Terms and conditions
                      </Link>
                    </li>
                    <li>
                      <Link to='/contact-us'>Help Center</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-4 col-12 col-sm-6'>
              <div className='footer__area-widget mb-30'>
                <div className='footer__area-title'>
                  <h3>Newsletter</h3>
                </div>
                <div className='footer__area-subscribe mt-45'>
                  <p>Subscribe to get all new updates</p>
                  <div
                    id='signup'
                    className='footer__area-subscribe__form mt-20'
                  >
                    <form
                      id='signup'
                      className='validate footer__subscribe'
                      target='_blank'
                      name='signup'
                    >
                      <div id='signup' className='footer__area-form'>
                        <input
                          className='email'
                          type='email'
                          required
                          placeholder='Enter your email'
                          name='EMAIL'
                        />

                        <div className='footer__clear'>
                          <button className='btn' type='submit'>
                            <i className='fa fa-search' />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='footer__bottom bg-gray-1 ptb-20'>
        <div className='container'>
          <div className='copyright text-center'>
            <p>
              © {new Date().getFullYear("Y")} <Link to='#'>Ecommerce</Link>. All
              Right Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
