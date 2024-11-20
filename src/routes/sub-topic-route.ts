import express from 'express'
import { createSubTopic, deleteSubTopic, getSubTopics, updateSubTopic } from '../controllers/subTopic-controller'
import { adminAuth } from '../middlewares/admin-auth';


const router = express.Router({mergeParams:true})

router.post('/',adminAuth,createSubTopic)
router.get('/',getSubTopics)
router.put('/:subTopicId',adminAuth,updateSubTopic)
router.delete('/:subTopicId',adminAuth,deleteSubTopic)

export default router