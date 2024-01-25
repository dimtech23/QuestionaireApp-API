
import express from 'express'
import { login } from '../controllers/authContoller.js'
import { getUser } from '../controllers/UserController.js'

const router = express.Router()

router.get('/user',  getUser)
export default router
