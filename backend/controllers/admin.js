const Order = require("../models/order");

//get all orders ---> admin
exports.getOrders = async (req, res) => {
  const orders = await Order.find({}).populate("products.product").exec();

  res.json(orders);
};

//get user's order details by id ---> admin
exports.getOrderDetailsByAdmin = async (req, res) => {
  const orderId = req.params.orderId;

  const order = await Order.findOne({
    _id: orderId,
  })
    .populate("products.product")
    .populate("orderdBy")
    .exec();

  // console.log(order);

  res.json(order);
};

//update order status ---> admin
exports.updateOrderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;

  const updateOrder = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();

  res.json(updateOrder);
};
