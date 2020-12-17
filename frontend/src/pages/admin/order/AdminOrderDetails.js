import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import PaymentMethod from "../../../components/order/PaymentMethod";
import SingleOrderTable from "../../../components/order/SingleOrderTable";
import {
  getOrderDetailsByAdmin,
  updateOrderStatus,
} from "../../../helpers/order";
import AdminProfile from "../AdminProfile";

const AdminOrderDetails = ({ match }) => {
  const [products, setProducts] = useState([]);
  const [paymentIntent, setPaymentIntent] = useState({});
  const [orderStatus, setOrderStatus] = useState("");

  const user = useSelector((state) => state.userList);
  const orderId = match.params.orderId;

  const { addToast } = useToasts();

  useEffect(() => {
    loadOrder();
    //eslint-disable-next-line
  }, []);

  // console.log(products);

  const loadOrder = () => {
    getOrderDetailsByAdmin(orderId, user.token)
      .then((res) => {
        // console.log(res.data.products);
        setProducts(res.data.products);
        setPaymentIntent(res.data.paymentIntent);
        setOrderStatus(res.data.orderStatus);
      })
      .catch((err) => console.log(err));
  };

  const hanldeOrderStatus = (orderId, orderStatus) => {
    updateOrderStatus(orderId, orderStatus, user.token).then((res) => {
      loadOrder();
      addToast("Status updated", {
        appearance: "success",
        autoDismiss: true,
      });
    });
  };

  return (
    <AdminProfile title='Order Details'>
      <div className='row'>
        <div className='col-md-12'>
          <PaymentMethod paymentIntent={paymentIntent} status='false' />

          <div className='row'>
            <div className='col-md-4'>Delivery Status</div>
            <div className='col-md-8'>
              <select
                onChange={(e) => hanldeOrderStatus(orderId, e.target.value)}
                className='form-control'
                value={orderStatus}
                name='status'
              >
                <option value='Not Processed'>Not Processed</option>
                <option value='Cash On Delivery'>Cash On Delivery</option>
                <option value='Processing'>Processing</option>
                <option value='Dispatched'>Dispatched</option>
                <option value='Cancelled'>Cancelled</option>
                <option value='Completed'>Completed</option>
              </select>
            </div>
          </div>

          <SingleOrderTable products={products} />
        </div>
      </div>
    </AdminProfile>
  );
};

export default AdminOrderDetails;
