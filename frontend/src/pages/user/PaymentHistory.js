import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserDashboard from "./UserDashboard";
import { getUserOrders } from "../../helpers/order";
import OrdersTable from "../../components/order/OrdersTable";

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
      <OrdersTable orders={orders} path='user' />
    </UserDashboard>
  );
};

export default PaymentHistory;
