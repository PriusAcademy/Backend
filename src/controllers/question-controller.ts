

import { Request, Response } from "express";
import prismadb from "../utils/prismadb";

export const getQuestions = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,subTopicId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const topics = await prismadb.question.findMany({
            where : {
                subTopicId
            }
        })
        return res.status(200).json(topics)
    } catch (error) {
        console.log("GET QUESTIONS CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const createQuestion = async (req:Request,res:Response):Promise<any>=>{
    try {
        
        const {learnerId,subTopicId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const {ans : ansIndex, ansExplanation:answer,code,text:question,options} = await req.body

        const data = await prismadb.question.create({
            data : {
                subTopicId,
                ansIndex,
                answer,
                code,
                question,
                options,
            }
        })
        return res.status(200).json(data)

    } catch (error) {
        console.log("POST QUESTION CONTROLLER",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const updateTopic = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,questionId,subTopicId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const {ans : ansIndex, ansExplanation:answer,code,text:question,options} = await req.body
        const topic = await prismadb.question.update({
            where : {id:questionId},
            data : {
                subTopicId,
                ansIndex,
                answer,
                code,
                question,
                options,
            }
        })
        return res.status(200).json(topic)
    } catch (error) {
        console.log("UPDATE QUESTION CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const deleteTopic = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,questionId,subTopicId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const topic = await prismadb.question.delete({
            where : {
                id:questionId,
                subTopicId
            }
        })
        return res.status(200).json({message:true})
    } catch (error) {
        console.log("DELETE QUESTION CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}
