import express from 'express'
import { getReportsByUser } from '../controllers/report-controller';


const router = express.Router({mergeParams:true})

router.get('/',getReportsByUser)
// router.put('/:subTopicId',adminAuth,updateSubTopic)
// router.delete('/:subTopicId',adminAuth,deleteSubTopic)

export default router