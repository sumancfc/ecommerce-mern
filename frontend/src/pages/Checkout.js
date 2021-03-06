import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import Layout from "../Layout";
import Breadcrumb from "../components/breadcrumb";
import {
  deleteUserCart,
  getAddress,
  getUserCarts,
  saveShippingAddress,
} from "../helpers/cart";
import ShippingAddress from "../components/shippingAddress";
import DiscountCoupon from "../components/discount";
import { applyDiscountCoupon } from "../helpers/coupon";
import OrderPlace from "../components/order/OrderPlace";
import { createOrderByCashOnDelivery } from "../helpers/order";
import { deleteAllFromCart } from "../store/actions/cartAction";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponName, setCouponName] = useState("");
  const [discountPrice, setDiscountPrice] = useState(0);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
  const [error, setError] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [COD, setCOD] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Stripe");

  const { address, city, postalCode, country } = shippingAddress;

  const user = useSelector((state) => state.userList);
  const coupon = useSelector((state) => state.coupon);

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {
    getUserCarts(user.token).then((res) => {
      setProducts(res.data.products);
      setTotalPrice(res.data.cartTotal);
    });
    getAddress(user.token)
      .then((res) => {
        // console.log(res.data);
        // setShippingAddress(res.data.shippingAddress);
      })
      .catch((err) => console.log(err));
  }, [user]);

  //handle address change
  const handleShippingAddressChange = (e) => {
    const { name, value } = e.target;

    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  //handle address submit
  const handleShippingAddress = (e) => {
    e.preventDefault();

    saveShippingAddress(shippingAddress, user.token)
      .then((res) => {
        setAddressSaved(res.data.ok);
        addToast("Address added", { appearance: "success", autoDismiss: true });
      })
      .catch((err) => console.log(err));
  };

  //apply discount coupon
  const applyCoupon = (e) => {
    e.preventDefault();
    // console.log("Coupon applied");
    applyDiscountCoupon(couponName, user.token)
      .then((res) => {
        if (res.data) {
          setPriceAfterDiscount(res.data.priceAfterDiscount);
          setDiscountPrice(res.data.discountPrice);

          dispatch({
            type: "COUPON_APPLIED",
            payload: true,
          });
        }

        if (res.data.err) {
          setError(res.data.err);
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
        }
        setCouponName("");
      })
      .catch((err) => console.log(err));
  };

  const handleOrder = () => {
    history.push("/payment");
  };

  const handleCashOnDelivery = (e) => {
    setCOD(true);
    setPaymentMethod(e.target.value);
  };

  const handleStripe = (e) => {
    setCOD(false);
    setPaymentMethod(e.target.value);
  };

  //create cash on delivery
  const createCashOnDelivery = () => {
    createOrderByCashOnDelivery(COD, coupon, user.token)
      .then((res) => {
        if (res.data.ok) {
          // empty cart from local storage
          if (typeof window !== "undefined") localStorage.removeItem("cart");
          // empty cart from redux
          dispatch(deleteAllFromCart(addToast));
          // reset coupon to false
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
          // empty cart from database
          deleteUserCart(user.token);

          setTimeout(() => {
            history.push("/user/history");
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <Breadcrumb pageTitle='Checkout' />

      <div className='checkout__area pt-90 pb-90'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 col-md-6'>
              <ShippingAddress
                address={address}
                city={city}
                postalCode={postalCode}
                country={country}
                handleShippingAddressChange={handleShippingAddressChange}
                handleShippingAddress={handleShippingAddress}
              />
              <DiscountCoupon
                couponName={couponName}
                setCouponName={setCouponName}
                applyCoupon={applyCoupon}
                error={error}
                setError={setError}
              />
            </div>

            <div className='col-lg-6 col-md-12'>
              <OrderPlace
                products={products}
                totalPrice={totalPrice}
                discountPrice={discountPrice}
                priceAfterDiscount={priceAfterDiscount}
                addressSaved={addressSaved}
                handleOrder={handleOrder}
                COD={COD}
                handleCashOnDelivery={handleCashOnDelivery}
                handleStripe={handleStripe}
                setPaymentMethod={setPaymentMethod}
                paymentMethod={paymentMethod}
                createCashOnDelivery={createCashOnDelivery}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
