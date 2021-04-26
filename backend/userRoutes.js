import express from 'express'
import { authUser, getUserProfile } from './userController.js'
import { protect } from './authMiddleware.js'

const router = express.Router()
router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile)

export default router
