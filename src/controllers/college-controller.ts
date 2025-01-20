
import { Request, Response } from "express";
import prismadb from "../utils/prismadb";

export const getColleges = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const colleges = await prismadb.college.findMany()
        return res.status(200).json(colleges)
    } catch (error) {
        console.log("GET COLLEGES CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const createCollege = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }

        const {name} = await req.body

        const college = await prismadb.college.create({
            data : {
               name,
            }
        })

        return res.status(200).json(college)

    } catch (error) {
        console.log("POST COLLEGE CONTROLLER",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const updateSubTopic = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,subTopicId,topicId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const {name} =await req.body
        const subTopic = await prismadb.subTopic.update({
            data : {
                name
            },
            where : {
                id:subTopicId,
                topicId
            }
        })
        return res.status(200).json(subTopic)
    } catch (error) {
        console.log("UPDATE SUBTOPIC CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const deleteSubTopic = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,subTopicId,topicId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const subTopic = await prismadb.subTopic.delete({
            where : {
                id:subTopicId,
                topicId
            }
        })
        return res.status(200).json({message:true})
    } catch (error) {
        console.log("DELETE SUBTOPIC CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}
