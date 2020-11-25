import React from "react";
import { Link } from "react-router-dom";

const MainMenu = ({ className }) => {
  return (
    <div className={`d-flex ${className}`}>
      <div className='header__main-menu'>
        <nav className='' id='offcanvas__navigation'>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about-us'>About Us</Link>
            </li>
            <li>
              <Link to='/shop'>Shop</Link>
            </li>
            <li>
              <Link to='/shop'>Mens</Link>
            </li>
            <li>
              <Link to='/shop'>Electronics</Link>
            </li>
            <li>
              <Link to='/contact-us'>Contact Us</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MainMenu;
