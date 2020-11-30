import React from "react";
import Breadcrumb from "../components/breadcrumb";
import ContactForm from "../components/contact-form";
import Info from "../components/info";
import Layout from "../Layout";

const Contact = () => {
  return (
    <Layout>
      <Breadcrumb pageTitle='Contact Us' />

      <div className='contact__area pt-85'>
        <div className='container'>
          <Info />
          <ContactForm />
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
