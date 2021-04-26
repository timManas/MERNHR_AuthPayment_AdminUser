import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from './userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log('Decoded')

      req.user = await User.findById(decoded.id).select('-password')
      console.log('req.user: ' + req.user)

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not Authorized, token failed')
    }
  }

  if (!token) {
    res.status('401')
    throw new Error('Not Autorized, no token')
  }
})

export { protect }
