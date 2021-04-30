import asyncHandler from 'express-async-handler'
import User from './userModel.js'
import generateToken from './generateToken.js'
import { token } from 'morgan'

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  console.log(`EmailPassowrd: ${email}    ${password}`)
  const user = await User.findOne({ email })
  console.log(`UserExists: ${JSON.stringify(user)}}`)
  console.log(
    `PasswordMatch: ${JSON.stringify(await user.matchPassword(password))}}`
  )
  if (user && (await user.matchPassword(password))) {
    console.log('Authenticated')
    const tokenGen = generateToken(user._id)
    console.log('Token: ' + tokenGen)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.password,
      isAdmin: user.isAdmin,
      token: tokenGen,
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

export const registerUser = asyncHandler(async (req, res) => {
  // Authorize user via email
  const { name, email, password } = req.body

  const userExist = await User.findOne({ email })
  if (userExist) {
    res.send(401)
    res.send('User already exists')
    throw new Error('User Already exists')
  }

  const user = await User.create({ name, email, password })
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error('Unable to add new user')
  }
})
