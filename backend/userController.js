import asyncHandler from 'express-async-handler'
import User from './userModel.js'
import generateToken from './generateToken.js'

export const authUser = asyncHandler(async (req, res) => {
  // Authorize user via email
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    console.log('NOT Authenticated')
    res.status(401)
    res.json({ error: 'User not found' })
  }
})

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id)
  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401)
  }
})
