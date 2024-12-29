import express from 'express'
import { auth } from '../middlewares/auth';
import { createTestProgress, getTestProgresses,getTestProgress, updateTestProgress } from '../controllers/test-progress';



const router = express.Router({mergeParams:true})

router.post('/',auth,createTestProgress)
router.post('/testProgressId',auth,createTestProgress)
router.get('/',getTestProgresses)
router.patch('/:testProgressId',auth,updateTestProgress)

export default router