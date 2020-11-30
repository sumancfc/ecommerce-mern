import React from "react";
import Button from "../button";

const ContactForm = () => {
  return (
    <div className='info__wrap mb-50'>
      <h3>Get In Touch</h3>
      <div className='form__wrap'>
        <form id='form' action='' method=''>
          <div className='row'>
            <div className='col-lg-6'>
              <input name='name' type='text' placeholder='Name' />
            </div>
            <div className='col-lg-6'>
              <input name='email' type='email' placeholder='Email' />
            </div>
            <div className='col-lg-12'>
              <input name='subject' type='text' placeholder='Subject' />
            </div>
            <div className='col-lg-12'>
              <textarea name='message' placeholder='Your Message'></textarea>
            </div>
            <div className='col-lg-12'>
              <Button title='Send Message' />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
