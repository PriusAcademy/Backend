

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

export const getQuestionCount = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,subTopicId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const count = await prismadb.question.count({
            where : {
                subTopicId
            }
        })
        return res.status(200).json(count)
    } catch (error) {
        console.log("GET QUESTIONS COUNT CONTROLLER ",error)
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
        const { questions } = await req.body as { questions: { ans: string, ansExplanation: string, code: boolean, text: string,options:string[] }[] }
        
        const questionArray = questions.map(question => ({
            ansIndex: question.ans,
            answer: question.ansExplanation,
            code: question.code,
            question:question.text,
            options: question.options,
            subTopicId
        }))
        const data = await prismadb.question.createMany({
            data : questionArray
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

export const deleteQuestion = async (req:Request,res:Response):Promise<any>=>{
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
