import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSlider = () => {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  let data = [
    {
      bgImg: "slider1.jpg",
      sliderTitle: "Welcome to ecommerce",
      brand: "rolex",
      btnLink: "/shop",
    },
    {
      bgImg: "slider2.jpg",
      sliderTitle: "Welcome to ecommerce",
      brand: "rolex",
      btnLink: "/shop",
    },
    {
      bgImg: "slider3.jpg",
      sliderTitle: "Welcome to ecommerce",
      brand: "rolex",
      btnLink: "/shop",
    },
  ];

  return (
    <section className='p-0 slider'>
      <Slider className='slide-1 hero__slider' {...settings}>
        {data.map((value, i) => {
          return (
            <div key={i}>
              <div
                className='hero text-left slider__left'
                style={{
                  backgroundImage: `url(assets/images/slider/${value.bgImg})`,
                }}
              >
                <div className='container'>
                  <div className='row'>
                    <div className='col'>
                      <div className='slider__container'>
                        <div>
                          <h4>{value.sliderTitle}</h4>
                          <h1>{value.brand}</h1>
                          <div className=' default-btn btn-hover mt-20'>
                            <Link
                              to={value.btnLink}
                              className='btn-size-md btn-style-outline'
                            >
                              shop now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

export default HeroSlider;
