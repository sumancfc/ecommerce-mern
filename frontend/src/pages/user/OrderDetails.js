import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserDashboard from "./UserDashboard";
import { getOrderDetails } from "../../helpers/order";

const OrderDetails = ({ match }) => {
  const [products, setProducts] = useState([]);
  const [paymentIntent, setPaymentIntent] = useState({});
  const [showStatus, setShowStatus] = useState("");

  const user = useSelector((state) => state.userList);
  const orderId = match.params.orderId;

  useEffect(() => {
    loadOrder();
    //eslint-disable-next-line
  }, []);

  const loadOrder = () => {
    getOrderDetails(orderId, user.token)
      .then((res) => {
        setProducts(res.data.products);
        setPaymentIntent(res.data.paymentIntent);
        setShowStatus(res.data.orderStatus);
      })
      .catch((err) => console.log(err));
  };

  return (
    <UserDashboard title='Order Details'>
      <div className='row'>
        <div className='col-md-12'>
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
            {showStatus && (
              <p className='badge bg-primary text-white p-2'>
                STATUS: {showStatus}
              </p>
            )}
          </div>

          <div className='mt-40'>
            <table className='table table-bordered'>
              <thead className='thead-dark'>
                <tr>
                  <th scope='col'>S.N</th>
                  <th scope='col'>Title</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Brand</th>
                  <th scope='col'>Color</th>
                  <th scope='col'>Count</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <b>{p.product.title}</b>
                    </td>
                    <td>{p.product.price}</td>
                    <td>{p.product.brand}</td>
                    <td>{p.color}</td>
                    <td>{p.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </UserDashboard>
  );
};

export default OrderDetails;
