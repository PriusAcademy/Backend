
import { Request, Response } from "express";
import prismadb from "../utils/prismadb";

export const allotTest = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,subTopicId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const {start,end} = await req.body

        const existingSubTopic = await prismadb.subTopic.findUnique({
            where: {
                id : subTopicId
            }
        })

        const assignment = await prismadb.assignment.create({
            data : {
                subTopicId,
                start: parseInt(start),
                end : parseInt(end)
            },
        })
        // console.log(body)
        return res.status(200).json(assignment)
    } catch (error) {
        console.log("ALLOT TEST CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const getSubTopicsForAllotments = async (req:Request,res:Response):Promise<any>=>{
    try {

        const {learnerId, user_code } = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const code = parseInt(user_code)
        const assignments = await prismadb.assignment.findMany({
            where: {
                AND: [
                    { start: { lte: code } },
                    {end : {gte:code}}
                ]
            },
            include: {
                subTopic : true
            }
        })

        const subTopics = assignments.map(assignment=>assignment.subTopic)

        // console.log(body)
        return res.status(200).json(subTopics)
    } catch (error) {
        console.log("GET TEST CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}
