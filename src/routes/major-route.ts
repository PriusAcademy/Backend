import express from 'express'
import { createMajor, deleteMajor, getMajors, updateMajor } from '../controllers/major-controller'
import { adminAuth } from '../middlewares/admin-auth';



const router = express.Router({mergeParams:true})

router.post('/',createMajor)
router.get('/',getMajors)
router.put('/:majorId',updateMajor)
router.delete('/:majorId',deleteMajor)

export default router