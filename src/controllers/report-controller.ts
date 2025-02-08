
import { Request, Response } from "express";
import prismadb from "../utils/prismadb";
// import { CustomRequest } from "../middlewares/auth";

export const getReportsByUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const {learnerId } = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const { collegeId, startingNumber, endingNumber } = req.query as { collegeId: string, startingNumber: string, endingNumber: string } 
        const startingCode = parseInt(startingNumber)
        const endingCode = parseInt(endingNumber)
        
        const users = await prismadb.user.findMany({
            where: {
                AND: [
                    { code: { gte: startingCode } },
                    {code:{lte:endingCode}}
                ]
            },
            include: {
                assignments: {
                    include: {
                        topic: {
                            include: {
                                subTopics: true
                            }
                        }
                    }
                }
            }
        })

        const reports = []
        for (const user of users) {
            let courseData = []
            for (const assignment of user.assignments) {
                
                let testProgresses = []
                for (const suptopic of assignment.topic.subTopics) {
 
                    let test = await prismadb.testProgress.findFirst({
                        where: {
                            userId: user.id,
                            subTopicId : suptopic.id
                        }
                    })
                    let testProgress = 
                    {
                        name: suptopic.name,
                    doa: assignment.createdAt,
                        status: test?.completed || false,
                        attempts : test?.attemptsRemaining || 0,
                        doc : assignment.createdAt
                    }
                    testProgresses.push(testProgress)
                }

                let data:{name:string,subtopics:any[]} = {
                    name: assignment.topic.name,
                    subtopics : testProgresses
                }
                courseData.push(data)
            }

            let report = {
                name: user.name,
                registerNumber: user.registerNumber,
                loginId: user.email,
                course : courseData
            }
            reports.push(report)
        }
        
        return res.status(200).json(reports)
    } catch (error) {
        console.log("GET REPORT CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}