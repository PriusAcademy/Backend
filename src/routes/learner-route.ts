import express from 'express'
import { createLearner, getLearner, getLearners } from '../controllers/learner-controller'
import { adminAuth } from '../middlewares/admin-auth';



const router = express.Router()

router.get('/',getLearners)
router.get('/:learnerId',getLearner)
router.post('/',adminAuth,createLearner)


export default router