import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ className }) => {
  return (
    <div className={`${className}`}>
      <Link to='/'>Ecommerce</Link>
    </div>
  );
};

export default Logo;
