import React from "react";

const Featured = () => {
  const features = [
    {
      image: "feature-icon-1.png",
      title: "Best Product",
      subTitle: "Best Queality Products",
    },
    {
      image: "feature-icon-2.png",
      title: "100% fresh",
      subTitle: "Best Queality Products",
    },
    {
      image: "feature-icon-3.png",
      title: "Secure Payment",
      subTitle: "Best Queality Products",
    },
    {
      image: "feature-icon-4.png",
      title: "Best Wood",
      subTitle: "Best Queality Products",
    },
  ];

  return (
    <div className='feature__area pb-90 section-padding'>
      <div className='container'>
        <div className='feature__border feature__border-abt'>
          <div className='row'>
            {features.map((feature, i) => {
              const { image, title, subTitle } = feature;
              return (
                <div key={i} className='col-lg-3 col-md-6 col-sm-6'>
                  <div className='feature__wrap mb-30 text-center'>
                    <img src={`assets/images/icon-img/${image}`} alt={title} />
                    <h5>{title}</h5>
                    <span>{subTitle}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
