import React from "react";
import { Link } from "react-router-dom";
import Logo from "../logo";
import Search from "../search/Search";
import MenuCart from "../menucart";

const MobileHeader = () => {
  const openMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas__mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  return (
    <>
      <div className='mobile__header'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-6'>
              <Logo className='mobile__header-logo' />
            </div>
            <div className='col-6'>
              <div className='mobile__header-right'>
                <MenuCart />

                <div className='off__canvas-mobile'>
                  <Link
                    className='mobile__side-menu'
                    to='#'
                    onClick={openMobileMenu}
                  >
                    <i className='fa fa-navicon fa-2x'></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Search className='col-sm-12 header__search-wrap mobile__search' />
    </>
  );
};

export default MobileHeader;
