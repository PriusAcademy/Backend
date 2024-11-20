import express from 'express'
import { adminSignIn } from '../controllers/admin-auth-controller'



const router = express.Router()

router.post('/signin',adminSignIn)


export default router