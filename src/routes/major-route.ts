import express from 'express'
import { createMajor, deleteMajor, getMajors, updateMajor } from '../controllers/major-controller'
import { adminAuth } from '../middlewares/admin-auth';



const router = express.Router({mergeParams:true})

router.post('/',adminAuth,createMajor)
router.get('/',getMajors)
router.put('/:majorId',adminAuth,updateMajor)
router.delete('/:majorId',adminAuth,deleteMajor)

export default router