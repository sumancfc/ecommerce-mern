import React, { useEffect, useState } from "react";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";

const ProductImageSlider = ({ product }) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  //effect for swiper slider synchronize
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  //swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  return (
    <div className='col-lg-6 col-md-6'>
      <div className='product-large-image-wrapper'>
        <Swiper {...gallerySwiperParams}>
          {product.images &&
            product.images.map((single, key) => {
              return (
                <div key={key}>
                  <div className='single-image'>
                    <img
                      src={process.env.PUBLIC_URL + single.url}
                      className='img-fluid'
                      alt=''
                    />
                  </div>
                </div>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductImageSlider;
