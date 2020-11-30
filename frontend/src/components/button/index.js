import React from "react";

const Button = ({ title }) => {
  return (
    <div className='button__wrap'>
      <button className='btn-check'>{title}</button>
    </div>
  );
};

export default Button;
