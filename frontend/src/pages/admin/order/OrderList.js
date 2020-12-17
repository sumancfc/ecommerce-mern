import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrdersTable from "../../../components/order/OrdersTable";
import { getAllOrders } from "../../../helpers/order";
import AdminProfile from "../AdminProfile";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const user = useSelector((state) => state.userList);

  useEffect(() => {
    loadAllOrders();
    //eslint-disable-next-line
  }, []);

  console.log(orders);

  const loadAllOrders = () => {
    getAllOrders(user.token)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <AdminProfile
      title={orders.length > 0 ? "All Orders" : "No Purchase Orders"}
    >
      <OrdersTable orders={orders} path='admin' />
    </AdminProfile>
  );
};

export default OrderList;
