import express from 'express'
import Product from './productModel.js'
import asyncHandler from 'express-async-handler'

const router = express.Router()

router.route('/').get(
  asyncHandler(async (req, res) => {
    const data = await Product.find({})
    res.json(data)
  })
)

export default router
