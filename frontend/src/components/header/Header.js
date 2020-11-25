import React, { useEffect, useState } from "react";
import Search from "../search";
import Topbar from "./sub/Topbar";
import MainMenu from "./sub/MainMenu";
import MiddleHeader from "./sub/MiddleHeader";
import MobileHeader from "./MobileHeader";
import AsideMenu from "./AsideMenu";

const Header = () => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);

  useEffect(() => {
    const header = document.querySelector(".header__nav-sticky");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <>
      <header className='heaader__area'>
        <div className='header__area-main'>
          <Topbar clsName='bg-black' />

          <MiddleHeader />
          <div
            className={`header__area-bottom header__nav-sticky background__red ${
              scroll > headerTop ? "stick" : ""
            }`}
          >
            <div className='container'>
              <div className='row align-items-center'>
                {scroll > headerTop ? (
                  <Search className='col-md-3 header__search-wrap' />
                ) : (
                  ""
                )}
                {scroll > headerTop ? (
                  <MainMenu className='col-md-9' />
                ) : (
                  <MainMenu className='col-md-12' />
                )}
              </div>
            </div>
          </div>
        </div>

        <MobileHeader />
      </header>
      <AsideMenu />
    </>
  );
};

export default Header;
