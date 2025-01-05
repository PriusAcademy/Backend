import express from 'express'
import { allotTest ,getSubTopicsForAllotments} from '../controllers/allot-test'
import { adminAuth } from '../middlewares/admin-auth';




const router = express.Router({mergeParams:true})

router.get('/:user_code',getSubTopicsForAllotments)
router.patch('/:subTopicId',allotTest)


export default router