import React from "react";
import { Link } from "react-router-dom";

const OrdersTable = ({ orders, path }) => {
  return (
    <div className='row'>
      <div className='col-md-12'>
        <table className='table'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>S.N</th>
              <th scope='col'>Order ID</th>
              <th scope='col'>Data</th>
              <th scope='col'>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.reverse().map((order, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <b>{order._id}</b>
                </td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>
                  <Link to={`/${path}/order/${order._id}`}>View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
