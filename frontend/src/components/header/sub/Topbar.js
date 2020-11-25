import React from "react";
import { Link } from "react-router-dom";

const Topbar = ({ clsName }) => (
  <div className={`header__area-top pt-15 pb-15 ${clsName}`}>
    <div className='container'>
      <div className='row'>
        <div className='col-lg-4'>
          <div className='header__top-left'>
            <p>Welcome to our shop</p>
          </div>
        </div>
        <div className='col-lg-8'>
          <div className='header__top-right'>
            <div className='top__content-left'>
              <Link className='currency__dropdown-active' to='#'>
                NRP <i className='fa fa-angle-down'></i>
              </Link>
              <div className='currency__dropdown'>
                <ul>
                  <li>
                    <Link to='#'>NRP</Link>
                  </li>
                  <li>
                    <Link to='#'>Euro</Link>
                  </li>
                  <li>
                    <Link to='#'>INR</Link>
                  </li>
                  <li>
                    <Link to='#'>USD</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className='top__content-right'>
              <Link to='/profile'>My Account</Link>
              <Link to='/wishlist'>Wishlist</Link>
              <Link to='/login-register'>Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Topbar;
