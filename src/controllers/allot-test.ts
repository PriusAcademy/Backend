
import { Request, Response } from "express";
import prismadb from "../utils/prismadb";

export const allotTest = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,subTopicId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const {startTime,endTime} = await req.body

        const existingSubTopic = await prismadb.subTopic.findUnique({
            where: {
                id : subTopicId
            }
        })
        const subTopic = await prismadb.subTopic.update({
            data : {
                name: existingSubTopic?.name,
                topicId: existingSubTopic?.topicId,
                testStartTime: new Date(startTime),
                testEndTime : new Date(endTime)  
            },
            where : {
                id: subTopicId,
            }
        })
        return res.status(200).json(subTopic)
    } catch (error) {
        console.log("ALLOT TEST CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}
