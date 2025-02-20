
import { Request, Response } from "express";
import prismadb from "../utils/prismadb";

export const getTopics = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,categoryId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const topics = await prismadb.topic.findMany({
            where : {
                categoryId
            }
        })
        return res.status(200).json(topics)
    } catch (error) {
        console.log("GET TOPICS CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const createTopic = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,categoryId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const {name,src} = await req.body

        const topic = await prismadb.topic.create({
            data : {
               name,
                categoryId,
               imgSrc : src || ''
            }
        })

        return res.status(200).json(topic)

    } catch (error) {
        console.log("POST TOPICS CONTROLLER",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const updateTopic = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,categoryId,topicId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const {name} =await req.body
        const topic = await prismadb.topic.update({
            data : {
                name
            },
            where : {
                id:topicId,
                categoryId
            }
        })
        return res.status(200).json(topic)
    } catch (error) {
        console.log("UPDATE TOPIC CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const deleteTopic = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,categoryId,topicId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const topic = await prismadb.topic.delete({
            where : {
                id:topicId,
                categoryId
            }
        })
        return res.status(200).json({message:true})
    } catch (error) {
        console.log("DELETE TOPIC CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}
