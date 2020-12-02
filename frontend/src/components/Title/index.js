import React from "react";

const Title = ({ title, desc }) => {
  return (
    <div className='section__title text-center mb-40'>
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  );
};

export default Title;
