import React from "react";
import Header from "../components/header/Header";

const Layout = ({ children }) => {
  return (
    <div className='page__wrapper'>
      <Header />

      {children}
    </div>
  );
};

export default Layout;
