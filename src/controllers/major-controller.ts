
import { Request, Response } from "express";
import prismadb from "../utils/prismadb";

export const getMajors = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId} = req.params
        const majors = await prismadb.major.findMany({
            where : {
                learnerId
            }
        })
        return res.status(200).json(majors)
    } catch (error) {
        console.log("GET MAJORS CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const createMajor = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId} = req.params
        const {name,src} = await req.body

        const major = await prismadb.major.create({
            data : {
               name,
                learnerId,
               src : src || ""
            }
        })

        return res.status(200).json(major)

    } catch (error) {
        console.log("POST MAJOR CONTROLLER",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const updateMajor = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,majorId} = req.params
        const {name} =await req.body
        const major = await prismadb.major.update({
            data : {
                name
            },
            where : {
                learnerId,
                id : majorId
            }
        })
        return res.status(200).json(major)
    } catch (error) {
        console.log("UPDATE MAJOR CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const deleteMajor = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {learnerId,majorId} = req.params
        const major = await prismadb.major.delete({
            where : {
                learnerId,
                id : majorId
            }
        })
        return res.status(200).json({message:true})
    } catch (error) {
        console.log("DELETE MAJOR CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}



// export const getLearner = async (req:Request,res:Response):Promise<any>=>{
//     try {

//         const {learnerId} = req.params

//         const learners = await prismadb.learner.findUnique({
//             where : {
//                 id : learnerId
//             },
//             include : {
//                 majors : {
//                     include : {
//                         specializations : {
//                             include : {
//                                 categories : {
//                                     include : {
//                                         topics : true
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         })
//         return res.status(200).json(learners)

//     } catch (error) {
//         console.log("GET LEARNERS CONTROLLER ",error)
//         return res.status(500).json({message:"Something Went wrong"})
//     }
// }