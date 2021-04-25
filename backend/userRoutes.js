import express from 'express'
import { authUser } from './userController.js'

const router = express.Router()
router.route('/login').post(authUser)

export default router
