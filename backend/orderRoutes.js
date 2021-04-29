import express from 'express'
import Order from './orderModel.js'
import asyncHandler from 'express-async-handler'
import { protect, admin } from './authMiddleware.js'
import { addOrderItems } from './orderController.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems)

export default router
