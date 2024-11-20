
import { Request, Response } from "express";
import prismadb from "../utils/prismadb";

export const getSpecializations = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,majorId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const specializations = await prismadb.specialization.findMany({
            where : {
                majorId
            }
        })
        return res.status(200).json(specializations)
    } catch (error) {
        console.log("GET SPECIALIZATIONS CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const createSpecialization = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,majorId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const {name} = await req.body

        const specialization = await prismadb.specialization.create({
            data : {
               name,
               majorId 
            }
        })

        return res.status(200).json(specialization)

    } catch (error) {
        console.log("POST SPECIALIZATIONS CONTROLLER",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const updateSpecialization = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,majorId,specializationId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const {name} =await req.body
        const specialization = await prismadb.specialization.update({
            data : {
                name
            },
            where : {
                id:specializationId,
                 majorId
            }
        })
        return res.status(200).json(specialization)
    } catch (error) {
        console.log("UPDATE SPECIALIZATION CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const deleteSpecialization = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,majorId,specializationId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const specialization = await prismadb.specialization.delete({
            where : {
                id:specializationId,
                 majorId
            }
        })
        return res.status(200).json({message:true})
    } catch (error) {
        console.log("DELETE SPECIALIZATION CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}
