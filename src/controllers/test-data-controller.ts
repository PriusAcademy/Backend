import { TestData } from './../../node_modules/.prisma/client/index.d';
import { Request, Response } from "express";
import prismadb from "../utils/prismadb";
import { CustomRequest } from "../middlewares/admin-auth";
import { isValidId } from "../utils/object-validator";


export const getTestData = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {testProgressId} = req.params
        
        if (!isValidId(testProgressId)) {
            return null;
        }

        const testData = await prismadb.testData.findFirst({
            where : {
                testProgressId : testProgressId 
            }
        })

        return res.status(200).json(testData)
    } catch (error) {
        console.log("GET TEST DATA CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

// export const createTestData = async (req:Request,res:Response):Promise<any>=>{
//     try {
//         const request = req as CustomRequest;
//         const { testProgressId } = await req.body

//         const testData = await prismadb.testData.create({
//             data : {
//                 testProgressId,
//                 data : []
//             }
//         })

//         return res.status(200).json(testData)

//     } catch (error) {
//         console.log("POST TEST DATA CONTROLLER",error)
//         return res.status(500).json({message:"Something Went wrong"})
//     }
// }