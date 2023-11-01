import express from 'express';
import Order from '../models/orderModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItem: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemPrice: req.body.itemPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.taxPrice,
      user: req.user._id,
    });

    const order = newOrder.save();
    res.status(201).send({ message: 'Order Created Successfully', order });
  })
);

export default orderRouter;
