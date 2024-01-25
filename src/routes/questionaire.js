
import express from 'express'
import { createHealthInsurance, getHealthInsurance } from '../controllers/healthInsuranceController.js'

const router = express.Router()

router.get('/questionaire', getHealthInsurance )
router.post('/questionaire', createHealthInsurance )
export default router
