import express from 'express'
// import { auth } from '../middlewares/auth';
import { getTestData } from '../controllers/test-data-controller';


const router = express.Router({mergeParams:true})

// router.post('/',auth,createTestData)
router.get('/:testProgressId',getTestData)


export default router