import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../../components/button";
import {
  createCoupon,
  deleteCoupon,
  getCoupons,
} from "../../../helpers/coupon";
import AdminProfile from "../AdminDashboard";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [expire, setExpire] = useState("");
  const [discount, setDiscount] = useState("");
  const [coupons, setCoupons] = useState([]);

  const user = useSelector((state) => state.userList);

  const { addToast } = useToasts();

  useEffect(() => {
    loadCoupons();
    //eslint-disable-next-line
  }, []);

  const loadCoupons = () => {
    getCoupons(user.token)
      .then((res) => {
        setCoupons(res.data);
      })
      .catch((err) => console.log(err));
  };

  const removeCoupon = (couponId) => {
    deleteCoupon(couponId, user.token).then((res) => {
      loadCoupons();
      addToast("Coupon deleted", {
        appearance: "error",
        autoDismiss: true,
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCoupon({ name, expire, discount }, user.token).then((res) => {
      // console.log(res)
      addToast("Coupon added", {
        appearance: "success",
        autoDismiss: true,
      });
      loadCoupons();
      setName("");
      setExpire("");
      setDiscount("");
    });
  };

  return (
    <AdminProfile title='Coupon'>
      <div className='account__form'>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='input__item'>
                <input
                  type='text'
                  name='name'
                  placeholder='Enter Coupon Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className='col-lg-12'>
              <div className='input__item'>
                <DatePicker
                  selected={new Date()}
                  value={expire}
                  onChange={(date) => setExpire(date)}
                  required
                  placeholderText='Choose Expire Date'
                />
              </div>
            </div>

            <div className='col-lg-12'>
              <div className='input__item'>
                <input
                  type='number'
                  name='discount'
                  placeholder='Enter Discount %'
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <Button title='Create Coupon' />
        </form>

        <hr />

        <div className='row mt-25'>
          <div className='col-sm-12 col-12'>
            <table className='table table-bordered'>
              <thead className='thead-dark'>
                <tr>
                  <th scope='col'>Name</th>
                  <th scope='col'>Expire</th>
                  <th scope='col'>Discount (%)</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon._id}>
                    <td>{coupon.name}</td>
                    <td>{new Date(coupon.expire).toLocaleDateString()}</td>
                    <td>{coupon.discount}%</td>
                    <td>
                      <button
                        onClick={() => removeCoupon(coupon._id)}
                        className='delete__btn'
                      >
                        <i className='fa fa-trash' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminProfile>
  );
};

export default CreateCoupon;
