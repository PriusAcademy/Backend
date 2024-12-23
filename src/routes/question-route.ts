import express from 'express'
import { createQuestion,getQuestionCount,getQuestions,deleteQuestion} from '../controllers/question-controller'
import { adminAuth } from '../middlewares/admin-auth';




const router = express.Router({mergeParams:true})

router.post('/', createQuestion)
router.get('/',getQuestions)
router.get('/count',getQuestionCount)
// router.put('/:topicId',updateTopic)
router.delete('/:questionId',deleteQuestion)

export default router