
import { Request, Response } from "express";
import prismadb from "../utils/prismadb";

export const getCategories = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,specializationId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const categories = await prismadb.category.findMany({
            where : {
                specializationId
            }
        })
        return res.status(200).json(categories)
    } catch (error) {
        console.log("GET CATEGORIES CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const createCategory = async (req:Request,res:Response):Promise<any>=>{
    try {
        const { learnerId, specializationId } = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const {name,src} = await req.body

        const category = await prismadb.category.create({
            data : {
               name,
                specializationId,
               src
            }
        })

        return res.status(200).json(category)

    } catch (error) {
        console.log("POST CATEGORY CONTROLLER",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const updateCategory = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,specializationId,categoryId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const {name} =await req.body
        const category = await prismadb.category.update({
            data : {
                name
            },
            where : {
                id:categoryId,
                 specializationId
            }
        })
        return res.status(200).json(category)
    } catch (error) {
        console.log("UPDATE CATEGORY CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const deleteCategory = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,specializationId,categoryId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const category = await prismadb.category.delete({
            where : {
                specializationId,
                id: categoryId,
                
            }
        })
        return res.status(200).json({message:true})
    } catch (error) {
        console.log("DELETE CATEGORY CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}
