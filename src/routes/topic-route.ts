import express from 'express'
import { createTopic, deleteTopic, getTopics, updateTopic } from '../controllers/topic-controller'
import { adminAuth } from '../middlewares/admin-auth';

const router = express.Router({mergeParams:true})

router.post('/',adminAuth,createTopic)
router.get('/',getTopics)
router.put('/:topicId',adminAuth,updateTopic)
router.delete('/:topicId',adminAuth,deleteTopic)

export default router