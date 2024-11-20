import express from 'express'
import { allotTest } from '../controllers/allot-test'
import { adminAuth } from '../middlewares/admin-auth';




const router = express.Router({mergeParams:true})

router.patch('/:subTopicId',adminAuth,allotTest)


export default router