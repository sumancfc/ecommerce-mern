import React from "react";
import Footer from "../components/footer";
import Header from "../components/header/Header";

const Layout = ({ children }) => {
  return (
    <div className='page__wrapper'>
      <Header />

      {children}

      <Footer />
    </div>
  );
};

export default Layout;
