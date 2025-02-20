import express from 'express'
import { createSpecialization, deleteSpecialization, getSpecializations, updateSpecialization } from '../controllers/specialization-controller'
import { adminAuth } from '../middlewares/admin-auth';



const router = express.Router({mergeParams:true})

router.post('/',createSpecialization)
router.get('/',getSpecializations)
router.put('/:specializationId',adminAuth,updateSpecialization)
router.delete('/:specializationId',adminAuth,deleteSpecialization)

export default router