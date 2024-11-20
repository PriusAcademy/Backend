import express from 'express'
import { createQuestion,getQuestions} from '../controllers/question-controller'
import { adminAuth } from '../middlewares/admin-auth';




const router = express.Router({mergeParams:true})

router.post('/',adminAuth,createQuestion)
router.get('/',getQuestions)
// router.put('/:topicId',updateTopic)
// router.delete('/:topicId',deleteTopic)

export default router