import express from 'express'
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/category-controller'
import { adminAuth } from '../middlewares/admin-auth';




const router = express.Router({mergeParams:true})

router.post('/',createCategory)
router.get('/',getCategories)
router.put('/:categoryId',adminAuth,updateCategory)
router.delete('/:categoryId',adminAuth,deleteCategory)

export default router