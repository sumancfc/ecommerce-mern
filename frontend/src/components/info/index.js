import React from "react";
import { Link } from "react-router-dom";

const Info = () => {
  return (
    <div className='info__wrap mb-50'>
      <h3>contact info</h3>
      <div className='row'>
        <div className='col-lg-4 col-md-4'>
          <div className='contact__info text-center mb-30'>
            <i className='fa fa-map'></i>
            <h4>our address</h4>
            <p>Kathmandu, Nepal.</p>
          </div>
        </div>
        <div className='col-lg-4 col-md-4'>
          <div className='contact__info  text-center mb-30'>
            <ul>
              <li>
                <i className='fa fa-phone'></i> 977-01-4444444
              </li>
              <li>
                <i className='fa fa-envelope'></i>
                <Link to='mailto:info@example.com'> info@example.com</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='col-lg-4 col-md-4'>
          <div className='contact__info text-center mb-30'>
            <i className='fa fa-coffee'></i>
            <h4>openning hour</h4>
            <p>Monday - Friday. 9:00am - 5:00pm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
