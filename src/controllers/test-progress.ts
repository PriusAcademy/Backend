import { Request, Response } from "express";
import prismadb from "../utils/prismadb";
import { CustomRequest } from "../middlewares/admin-auth";
import { isValidId } from "../utils/object-validator";

export const getTestProgresses = async (req:Request,res:Response):Promise<any>=>{
    try {
        const { topicId,userId } = req.query as {topicId:string,userId:string}
        

        const subTopics = await prismadb.subTopic.findMany({
            where : {
                topicId
            }
        })
        
        const testProgresses = await prismadb.testProgress.findMany({
            where: {
                userId,
                subTopicId: {
                    in : subTopics.map(item=>item.id)
                }
            }
        })

        return res.status(200).json(testProgresses)
    } catch (error) {
        console.log("GET TEST PROGRESSES CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const getTestProgress = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {testProgressId} = req.params
        
        if (!isValidId(testProgressId)) {
            return null;
        }

        const progress = await prismadb.testProgress.findUnique({
            where : {
                id : testProgressId
            }
        })

        return res.status(200).json(progress)
    } catch (error) {
        console.log("GET TEST PROGRESS CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const createTestProgress = async (req:Request,res:Response):Promise<any>=>{
    try {
        const request = req as CustomRequest;
        const { subTopicId } = await req.body

        const data = await prismadb.testProgress.create({
            data : {
                subTopicId,
                userId: request.userId as string,
                completed: false,
            }
        })

        const testData = await prismadb.testData.create({
            data: {
                testProgressId: data.id,
                data : []
            }
        })

        return res.status(200).json({...testData,...data})

    } catch (error) {
        console.log("POST TEST PROGRESS CONTROLLER",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}