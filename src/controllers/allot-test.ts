
import { Request, Response } from "express";
import prismadb from "../utils/prismadb";
import { CustomRequest } from "../middlewares/auth";

export const allotTest = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,topicId} = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }

        const { startTime, endTime, collegeId, year, description } = await req.body

        // const existingSubTopic = await prismadb.subTopic.findUnique({
        //     where: {
        //         id : subTopicId
        //     }
        // })

        const users = await prismadb.user.findMany({
            where: {
                collegeId,
                year
            }
        })

        for (const user of users) {
            await prismadb.assignment.create({
                data: {
                    userId : user.id,
                    description,
                    startTime: new Date(startTime),
                    endTime: new Date(endTime),
                    topicId
                }
            })
        }

        // console.log(body)
        return res.status(200).json({message : "Successfully Assigned"})
    } catch (error) {
        console.log("ALLOT TEST CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const getTopicsForAssignment = async (req:Request,res:Response):Promise<any>=>{
    try {
        const request = req as CustomRequest
        const {learnerId } = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const query = req.query as {userId:string}
        
        const assignments = await prismadb.assignment.findMany({
            where: {
                userId : query.userId
            },
            include: {
                topic: {
                    include: {
                        subTopics: {
                            include: {
                                _count: { select: { questions: true } },
                                testProgresses: {
                                    where: {
                                        userId: request.userId,
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: {
                endTime : 'asc'
            }
        })

        const processedAssignments = assignments.map((assignment) => ({
        ...assignment,
        topic: {
            ...assignment.topic,
            subTopics: assignment.topic.subTopics.map((subTopic) => ({
                questionCount: subTopic._count.questions,
            ...subTopic ,
            testProgresses : undefined,
            testProgress: subTopic.testProgresses.find(
                (testProgress) => testProgress.subTopicId === subTopic.id && testProgress.userId == query.userId
                ) || null,
            })),
        },
        }));

        // console.log(request.userId)
        // console.log(processedAssignments[0].topic.subTopics)
        return res.status(200).json(processedAssignments)
    } catch (error) {
        console.log("GET TEST CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}




