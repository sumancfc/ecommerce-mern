import React from "react";

const PaymentMethod = ({ paymentIntent, orderStatus, status = true }) => {
  return (
    <div className='order__details'>
      <p>
        <strong>Payment Order Id:</strong> {paymentIntent.id}
      </p>
      <p>
        <strong> Amount:</strong>${paymentIntent.amount / 100}
      </p>
      <p>
        <strong>Currency:</strong>
        {paymentIntent.currency}
      </p>
      <p>
        <strong>Method:</strong> {paymentIntent.payment_method_types}
      </p>

      <p>
        <strong>Payment:</strong> {paymentIntent.status}
      </p>

      <p>
        <strong> Data:</strong>
        {new Date(paymentIntent.created * 1000).toLocaleString()}
      </p>
      {status && orderStatus && (
        <p className={`badge text-white p-3 ${orderStatus}`}>
          STATUS: {orderStatus}
        </p>
      )}
    </div>
  );
};

export default PaymentMethod;
