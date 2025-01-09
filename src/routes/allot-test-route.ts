import express from 'express'
import { allotTest,getTopicsForAssignment } from '../controllers/allot-test'
import { adminAuth } from '../middlewares/admin-auth';




const router = express.Router({mergeParams:true})

router.get('/:user_code',getTopicsForAssignment)
router.post('/:topicId',allotTest)


export default router