import express from 'express'
// import { createSubTopic, deleteSubTopic, getSubTopics, updateSubTopic } from '../controllers/subTopic-controller'
import { adminAuth } from '../middlewares/admin-auth';
import { createCollege, getColleges } from '../controllers/college-controller';


const router = express.Router({mergeParams:true})

router.post('/',createCollege)
router.get('/',getColleges)
// router.put('/:subTopicId',adminAuth,updateSubTopic)
// router.delete('/:subTopicId',adminAuth,deleteSubTopic)

export default router