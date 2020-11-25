import React from "react";
import MainMenu from "./sub/MainMenu";

const AsideMenu = () => {
  const closeMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas__mobile-menu"
    );
    offcanvasMobileMenu.classList.remove("active");
  };

  return (
    <div className='offcanvas__mobile-menu' id='offcanvas__mobile-menu'>
      <button
        className='offcanvas__menu-close'
        id='mobile__menu-close-trigger'
        onClick={() => closeMobileMenu()}
      >
        <i className='fa fa-close'></i>
      </button>
      <div className='offcanvas__wrapper'>
        <div className='offcanvas__inner-content'>
          <MainMenu />
        </div>
      </div>
    </div>
  );
};

export default AsideMenu;
