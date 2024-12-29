import { Request, Response } from "express";
import prismadb from "../utils/prismadb";
import { CustomRequest } from "../middlewares/admin-auth";
import { isValidId } from "../utils/object-validator";
import nodemailer from 'nodemailer'

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

        const totalQuestions = await prismadb.question.count({
            where: {
                subTopicId
            }
        })

        const data = await prismadb.testProgress.create({
            data : {
                subTopicId,
                userId: request.userId as string,
                completed: false,
                maxMarks: 0,
                totalQuestions
            }
        })

        // const testData = await prismadb.testData.create({
        //     data: {
        //         testProgressId: data.id,
        //         data : []
        //     }
        // })

        return res.status(200).json(data)

    } catch (error) {
        console.log("POST TEST PROGRESS CONTROLLER",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const updateTestProgress = async (req:Request,res:Response):Promise<any>=>{
    try {
        // const request = req as CustomRequest;
        // const { subTopicId } = await req.body

        // const data = await prismadb.testProgress.create({
        //     data : {
        //         subTopicId,
        //         userId: request.userId as string,
        //         completed: false,
        //     }
        // })
        const { testProgressId } = req.params
        const {totalMarks,totalQuestions,email} = await req.body;
        
        // const testData = await prismadb.testData.create({
        //     data: {
        //         testProgressId: data.id,
        //         data : []
        //     }
        // })
        
        // const { totalMarks, totalQuestions } = await req.body
        const existing = await prismadb.testProgress.findUnique({
            where: {
                id:testProgressId
            }, include: {
                subTopic : true
            }
        })

        // console.log(existing, email, totalMarks, totalQuestions)
        // console.log(process.env.password,"PASSWORD")
        const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",  // or your SMTP server
                port: 587,
                secure: false,  // Set to false for STARTTLS
                auth: {
                    user: "rajesh99ed@gmail.com",
                    pass: process.env.EMAIL_PASSWORD
                },
                tls: {
                    rejectUnauthorized: false, // Skip SSL certificate verification (use cautiously)
                },
                });

        const mailOptions = {
            from: 'priusitservices@gmail.com',
            to: email,
            subject: `Test Results - ${existing?.subTopic.name}`,
            html: `
                <h1>Test Results</h1>
                <h2>${existing?.subTopic.name || ""}</h2>
                Your Marks ${totalMarks} out of ${totalQuestions} , <b> ${((totalMarks / totalQuestions)*100).toFixed(2)}%</b>
            `
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("ERROR SENDING MARKS EMAIL",error)
            } else {
                console.log("EMAIL SENT: ",info.response)
            }
        })


        // const data = await prismadb.testProgress.update({
        //     where: {
        //         id : testProgressId
        //     }, data: {
        //         maxMarks: totalMarks,
        //         totalQuestions,
        //         attemptsRemaining : (existing?.attemptsRemaining || 3) - 1
        //     }
        // })

        return res.status(200).json("data")

    } catch (error) {
        console.log("PATCH TEST PROGRESS CONTROLLER",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}