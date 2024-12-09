import express from 'express'
import { auth } from '../middlewares/auth';
import { createTestProgress, getTestProgresses,getTestProgress } from '../controllers/test-progress';



const router = express.Router({mergeParams:true})

router.post('/',auth,createTestProgress)
router.get('/',getTestProgresses)
router.get('/:testProgressId',getTestProgress)

export default router