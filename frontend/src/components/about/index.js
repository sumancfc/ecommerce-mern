import React from "react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <div className='about__area pt-90 pb-90'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 col-md-6'>
            <div className='about__img text-center'>
              <Link to='#'>
                <img src='assets/images/banner/about.jpg' alt='' />
              </Link>
            </div>
          </div>
          <div className='col-lg-6 col-md-6 align-self-center'>
            <div className='about__content'>
              <h2>
                Welcome To <span>React - Ecommerce</span>
              </h2>
              <p className='paragraph'>
                React Ecommerce is a Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit
                amet.Lorem ipsum dolor sit amet.v
              </p>
              <p>
                React Ecommerce is a Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit
                amet.Lorem ipsum dolor sit amet.v
              </p>
              <div className='about__btn btn-hover hover-border-none'>
                <Link
                  className='btn-color-white btn-color-theme-bg black'
                  to='/shop'
                >
                  Shop now!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
