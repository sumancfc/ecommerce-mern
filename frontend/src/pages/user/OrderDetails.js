import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserDashboard from "./UserDashboard";
import { getOrderDetails } from "../../helpers/order";
import SingleOrderTable from "../../components/order/SingleOrderTable";
import PaymentMethod from "../../components/order/PaymentMethod";

const OrderDetails = ({ match }) => {
  const [products, setProducts] = useState([]);
  const [paymentIntent, setPaymentIntent] = useState({});
  const [orderStatus, setOrderStatus] = useState("");

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
        setOrderStatus(res.data.orderStatus);
      })
      .catch((err) => console.log(err));
  };

  return (
    <UserDashboard title='Order Details'>
      <div className='row'>
        <div className='col-md-12'>
          <PaymentMethod
            paymentIntent={paymentIntent}
            orderStatus={orderStatus}
          />

          <SingleOrderTable products={products} />
        </div>
      </div>
    </UserDashboard>
  );
};

export default OrderDetails;
