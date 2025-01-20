import express from 'express'
import { getAssignmentsByUser } from '../controllers/report-controller';


const router = express.Router({mergeParams:true})

router.get('/',getAssignmentsByUser)
// router.put('/:subTopicId',adminAuth,updateSubTopic)
// router.delete('/:subTopicId',adminAuth,deleteSubTopic)

export default router