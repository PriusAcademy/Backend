
import { Request, Response } from "express";
import prismadb from "../utils/prismadb";
import { isAuthorized } from "../utils/authorization";


export const getLearners = async (req:Request,res:Response):Promise<any>=>{
    try {

        const learners = await prismadb.learner.findMany({
                include : {
                majors : {
                    include : {
                        specializations : {
                            include : {
                                categories : {
                                    include : {
                                        topics: {
                                            include: {
                                                subTopics : true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        
        
        return res.status(200).json(learners)

    } catch (error) {
        console.log("GET LEARNERS CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const createLearner = async (req:Request,res:Response):Promise<any>=>{
    try {

        if (!isAuthorized) {
            return res.status(500).json("UnAuthorized")
        }
        const {type} = await req.body

        const learner = await prismadb.learner.create({
            data : {
                type
            }
        })
        return res.status(200).json(learner)

    } catch (error) {
        console.log("POST LEARNER CONTROLLER",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}


export const getLearner = async (req:Request,res:Response):Promise<any>=>{
    try {

        const {learnerId} = req.params

        const learners = await prismadb.learner.findUnique({
            where : {
                id : learnerId
            },
            include : {
                majors : {
                    include : {
                        specializations : {
                            include : {
                                categories : {
                                    include : {
                                        topics: {
                                            include: {
                                                subTopics : true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        return res.status(200).json(learners)

    } catch (error) {
        console.log("GET LEARNERS CONTROLLER ",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}