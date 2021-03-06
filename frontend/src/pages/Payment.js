import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "../stripe.css";
import Breadcrumb from "../components/breadcrumb";
import Layout from "../Layout";
import StripeCheckout from "../components/stripe";

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <Layout>
      <Breadcrumb pageTitle='Payment' />
      <div className='container p-5 text-center'>
        <h4>Complete your purchase</h4>
        <Elements stripe={promise}>
          <div className='col-md-8 offset-md-2'>
            <StripeCheckout />
          </div>
        </Elements>
      </div>
    </Layout>
  );
};

export default Payment;
