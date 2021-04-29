import expressAsyncHandler from 'express-async-handler'
import asyncHandler from 'express-async-handler'
import Order from './orderModel.js'

export const addOrderItems = expressAsyncHandler(async (req, res) => {
  // GOAL, add this list to the Database
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length == 0) {
    res.status(400)
    throw new Error('No Order Items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createOrder = await order.save() // Adds orders to DB
    res.status(201).json(createOrder)
  }
})
