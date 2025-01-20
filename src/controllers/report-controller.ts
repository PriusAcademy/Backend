
import { Request, Response } from "express";
import prismadb from "../utils/prismadb";
// import { CustomRequest } from "../middlewares/auth";
import { Year } from "@prisma/client";

export const getAssignmentsByUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const {learnerId } = req.params
        const learnerIds = await prismadb.learner.findMany()
        if (!learnerIds.map(item=>item.id).includes(learnerId)){
            return res.status(400).json("Invalid")
        }
        const { collegeId, year } = req.query as { collegeId: string, year: Year }
        
        const users = await prismadb.user.findMany({
            where: {
                collegeId,
                year : year
            },
            include: {
                assignments : true
            }
        })
        
        return res.status(200).json(users)
    } catch (error) {
        console.log("GET TEST CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}