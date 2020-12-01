import React from "react";
import { Link } from "react-router-dom";

const LinkButton = ({ title, link, className = "" }) => {
  return (
    <div className={`default-btn btn-hover ${className}`}>
      <Link to={link} className='btn-size-md btn-style-outline'>
        {title}
      </Link>
    </div>
  );
};

export default LinkButton;
