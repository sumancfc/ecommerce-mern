import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserDashboard from "./UserDashboard";
import { getUserOrders } from "../../helpers/order";
import { Link } from "react-router-dom";

const PaymentHistory = () => {
  const [orders, setOrders] = useState([]);

  const user = useSelector((state) => state.userList);

  useEffect(() => {
    loadOrders();
    //eslint-disable-next-line
  }, []);

  const loadOrders = () => {
    getUserOrders(user.token)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <UserDashboard
      title={orders.length > 0 ? "User purchase orders" : "No purchase orders"}
    >
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
                    <Link to={`/user/order/${order._id}`}>View Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </UserDashboard>
  );
};

export default PaymentHistory;
