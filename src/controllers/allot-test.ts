
import { Request, Response } from "express";
import prismadb from "../utils/prismadb";

export const allotTest = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,topicId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const {startTime,endTime,start,end,description} = await req.body

        // const existingSubTopic = await prismadb.subTopic.findUnique({
        //     where: {
        //         id : subTopicId
        //     }
        // })

        const assignment = await prismadb.assignment.create({
            data: {
                startTime: new Date(startTime),
                endTime : new Date(endTime),
                topicId,
                start: parseInt(start),
                end: parseInt(end),
                description
            },
        })
        // console.log(body)
        return res.status(200).json(assignment)
    } catch (error) {
        console.log("ALLOT TEST CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const getTopicsForAssignment = async (req:Request,res:Response):Promise<any>=>{
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
                topic: {
                    include: {
                        subTopics : true
                    }
                }
            },
            orderBy: {
                endTime : 'asc'
            }
        })

        // const subTopics = assignments.map(assignment=>assignment.subTopic)

        // console.log(body)
        return res.status(200).json(assignments)
    } catch (error) {
        console.log("GET TEST CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}


